const getDB = require('../../db/getDB');
const { generateError, deletePhoto, savePhoto } = require('../../helpers');

const editWorks = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idWork } = req.params;

        const { title, description, category, orderer } = req.body;
        const imagen = req.files?.imagen;

        if (!(title || description || category || imagen || orderer)) {
            throw generateError('No se ha modificado ningún dato', 400);
        }

        const [works] = await connection.query(
            `SELECT title, description, image, category, orderer FROM work WHERE id = ?`,
            [idWork]
        );

        if (works.length < 1) {
            throw generateError('No existe el trabajo seleccionado', 404);
        }

        let imageName;
        if (imagen) {
            if (works[0].image) {
                await deletePhoto(works[0].image);
            }
            imageName = await savePhoto(imagen);
            await connection.query(`UPDATE work SET image = ? WHERE id = ?`, [
                imageName,
                idWork,
            ]);
        }

        await connection.query(
            `UPDATE work SET title = ?, description = ?, category = ? WHERE id = ?`,
            [
                title || works[0].title,
                description || works[0].description,
                category || works[0].category,
                orderer || works[0].orderer,
                idWork,
            ]
        );

        res.send({
            status: 'Ok',
            message: `El enlace con título "${title}", ha sido modificado con éxito!`,
            data: imageName,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editWorks;
