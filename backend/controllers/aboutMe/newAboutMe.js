const getDB = require('../../db/getDB');
const { generateError, saveFile } = require('../../helpers');

const newAboutMe = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { descriptionAboutMe } = req.body;

        if (!descriptionAboutMe) {
            throw generateError('Debes indicar una descripción', 400);
        }

        await connection.query(
            `INSERT INTO aboutme (descriptionaboutme, idUser)
            VALUES (?, ?)`,
            [descriptionAboutMe, 1]
        );

        const [lastId] = await connection.query(
            `SELECT MAX(id) as maxId FROM aboutme`
        );

        res.send({
            status: 'Ok',
            message: 'Registro sobre mi insertado con éxito!',
            data: { newId: lastId[0].maxId },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newAboutMe;
