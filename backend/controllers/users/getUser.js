const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();
        const { idUser } = req.params;
        const [[user]] = await connection.query(
            `SELECT username, id, userimage FROM user WHERE id = ?`,
            [idUser]
        );

        if (!user) {
            throw generateError('No existe ningún usuario', 404);
        }

        res.send({
            status: 'Ok',
            data: { ...user },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getUser;
