const getDB = require('../../db/getDB');
const { generateError, deletePhoto, savePhoto } = require('../../helpers');

const editWorks = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idWork } = req.params;

        const { title, description, category } = req.body;
        const imagen = req.files?.imagen;

        if (!(title || description || category || imagen)) {
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

        if (category !== works[0].category) {
            await connection.query(
                `UPDATE work SET orderer = orderer - 1 WHERE category = ? AND orderer > ?`,
                [
                    works[0].category,
                    works[0].orderer,
                ]
            );
            const lastOrderer = await connection.query(
                `SELECT MAX(orderer) as maxOrderer FROM work WHERE category = ?`,
                [
                    category,
                ]
            );
            const lastOrdererValue = lastOrderer[0]
            const newOrderer = lastOrdererValue[0].maxOrderer + 1;
            await connection.query(
                `UPDATE work SET orderer = ? WHERE id = ?`,
                [
                    newOrderer,
                    idWork,
                ]
            );
        }        

        await connection.query(
            `UPDATE work SET title = ?, description = ?, category = ? WHERE id = ?`,
            [
                title || works[0].title,
                description || works[0].description,
                category || works[0].category,
                idWork,
            ]
        );

        res.send({
            status: 'Ok',
            message: `El enlace ha sido modificado con éxito!`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editWorks;
