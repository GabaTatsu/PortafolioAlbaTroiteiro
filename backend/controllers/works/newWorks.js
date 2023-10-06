const getDB = require('../../db/getDB');
const { generateError, saveFile } = require('../../helpers');

const newWorks = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { title, description, category, orderer } = req.body;
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

        let imageName;
        imageName = await saveFile(image);

        if (!orderer) {
            const [lastOrderer] = await connection.query(
                `SELECT MAX(orderer) as maxOrderer FROM work WHERE category = ?`,
                [category]
            );

            await connection.query(
                `INSERT INTO work (title, description, image, orderer, category, createdAt, idUser)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    title,
                    description,
                    imageName,
                    lastOrderer[0].maxOrderer + 1,
                    category,
                    new Date(),
                    1,
                ]
            );
        } else {
            await connection.query(
                `INSERT INTO work (title, description, image, orderer, category, createdAt, idUser)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    title,
                    description,
                    imageName,
                    orderer,
                    category,
                    new Date(),
                    1,
                ]
            );
            await connection.query(
                `UPDATE work SET orderer = orderer + 1 WHERE category = ? AND orderer >= ?`,
                [category, orderer]
            );
        }

        const [lastId] = await connection.query(
            `SELECT MAX(id) as maxId FROM work`
        );

        res.send({
            status: 'Ok',
            message: 'Trabajo insertado con éxito!',
            data: { imageName, newId: lastId[0].maxId },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newWorks;
