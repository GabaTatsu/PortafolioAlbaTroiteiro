const getDB = require('../../db/getDB');
const { generateError, savePhoto } = require('../../helpers');

const newWorks = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { title, description, category } = req.body;
        const image = req.files?.image;

        if (!(image || title || category)) {
            throw generateError('No se ha introducido ningún dato', 400);
        }

        if (!title) {
            throw generateError('Debes indicar el título', 400);
        }
        if (!image) {
            throw generateError('Debes adjuntar una imagen', 400);
        }
        if (!category) {
            throw generateError('Debes marcar una categoría', 400);
        }

        const [user] = await connection.query(`SELECT * FROM user`);
        let imageName;
        imageName = await savePhoto(image);

        await connection.query(
            `INSERT INTO work (title, description, image, category, createdAt, idUser)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [title, description, imageName, category, new Date(), 1]
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
