const getDB = require('../../db/getDB');
const { generateError, savePhoto } = require('../../helpers');

const newWorks = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { title, description, image, category } = req.body;

        if (!title) {
            throw generateError('Debes indicar el título', 400);
        }
        if (!image) {
            throw generateError('Debes adjuntar una imagen', 400);
        }
        if (!category) {
            throw generateError('Debes marcar una categoría', 400);
        }

        await connection.query(
            `INSERT INTO link (title, description, category, createdAt, idUser)
            VALUES (?, ?, ?, ?, ?)`,
            [title, description, category, new Date(), 1]
        );

        res.send({
            status: 'Ok',
            message: 'Enlace insertado con éxito!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newWorks;
