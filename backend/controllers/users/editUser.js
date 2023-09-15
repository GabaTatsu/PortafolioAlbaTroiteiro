const getDB = require('../../db/getDB');
const { generateError, deleteFile, saveFile } = require('../../helpers');
const bcrypt = require('bcrypt');

const editUserAvatar = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { username, oldPass, newPass } = req.body;
        const userImage = req.files?.userimage;

        if (!(username || oldPass || newPass || userImage)) {
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

        if (user.length < 1) {
            throw generateError('No existe el usuario seleccionado', 404);
        }

        let imageName;
        if (userImage) {
            if (user[0].userimage) {
                await deleteFile(user[0].userimage);
            }
            imageName = await saveFile(userImage);
            await connection.query(`UPDATE user SET userimage = ? WHERE id = ?`, [
                imageName,
                1,
            ]);
        }   

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
            data: imageName,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editUserAvatar;
