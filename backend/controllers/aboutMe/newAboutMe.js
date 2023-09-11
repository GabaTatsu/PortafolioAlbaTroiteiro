const getDB = require('../../db/getDB');
const { generateError, savePhoto } = require('../../helpers');

const newAboutMe = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { descriptionAboutMe } = req.body;
        const imageAboutMe = req.files?.imageAboutMe;

        if (!(imageAboutMe || descriptionAboutMe)) {
            throw generateError('No se ha introducido ningún dato', 400);
        }

        if (!descriptionAboutMe) {
            throw generateError('Debes indicar una descripción', 400);
        }
        if (!imageAboutMe) {
            throw generateError('Debes adjuntar una imagen', 400);
        }

        let imageName;
        imageName = await savePhoto(imageAboutMe);

        await connection.query(
            `INSERT INTO aboutme (imageaboutme, descriptionaboutme, idUser)
            VALUES (?, ?, ?)`,
            [imageName, descriptionAboutMe, 1]
        );

        const [lastId] = await connection.query(
            `SELECT MAX(id) as maxId FROM aboutme`
        );

        res.send({
            status: 'Ok',
            message: 'Registro sobre mi insertado con éxito!',
            data: { imageName, newId: lastId[0].maxId},
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newAboutMe;