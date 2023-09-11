const getDB = require('../../db/getDB');
const { generateError, deletePhoto, savePhoto } = require('../../helpers');

const editAboutMe = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idAboutMe } = req.params;

        const { descriptionaboutme } = req.body;
        const imageaboutme = req.files?.imageaboutme;

        if (!(descriptionaboutme || imageaboutme)) {
            throw generateError('No se ha modificado ningún dato', 400);
        }

        const [aboutMes] = await connection.query(
            `SELECT * FROM aboutme WHERE id = ?`,
            [idAboutMe]
        );

        if (aboutMes.length < 1) {
            throw generateError('No existe el registro seleccionado', 404);
        }

        let imageName;
        if (imageaboutme) {
            if (aboutMes[0].imageaboutme) {
                await deletePhoto(aboutMes[0].imageaboutme);
            }
            imageName = await savePhoto(imageaboutme);
            await connection.query(`UPDATE aboutme SET imageaboutme = ? WHERE id = ?`, [
                imageName,
                idAboutMe,
            ]);
        }     

        await connection.query(
            `UPDATE aboutme SET descriptionaboutme = ? WHERE id = ?`,
            [
                descriptionaboutme || aboutMes[0].descriptionaboutme,
                idAboutMe,
            ]
        );

        res.send({
            status: 'Ok',
            message: `El registro ha sido modificado con éxito!`,
            data: imageName,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editAboutMe;
