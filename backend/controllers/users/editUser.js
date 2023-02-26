const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const bcrypt = require('bcrypt');

const editUserAvatar = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { username, oldPass, newPass } = req.body;

        if (!(username || oldPass || newPass)) {
            throw generateError('No se ha introducido ningún dato', 400);
        }

        if (oldPass && !newPass) {
            throw generateError(
                'Debes indicar la nueva contraseña para el cambio',
                400
            );
        }

        if (newPass && !oldPass) {
            throw generateError(
                'Debes indicar la antigua contraseña para el cambio',
                400
            );
        }
        if (newPass && oldPass) {
            if (newPass === oldPass) {
                throw generateError(
                    'La antigua y nueva contraseñas son la misma',
                    400
                );
            }
        }

        const [user] = await connection.query(`SELECT * FROM user`);

        if (username) {
            await connection.query(`UPDATE user SET username = ?`, [username]);
        }

        if (oldPass && newPass) {
            const isValid = await bcrypt.compare(oldPass, user[0].password);

            if (!isValid) {
                throw generateError('La contraseña antigua no coincide', 401);
            }

            const hashedPassword = await bcrypt.hash(newPass, 10);

            await connection.query(`UPDATE user SET password = ?`, [
                hashedPassword,
            ]);
        }

        res.send({
            status: 'Ok',
            message: 'Datos del usuario modificados con éxito',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editUserAvatar;
