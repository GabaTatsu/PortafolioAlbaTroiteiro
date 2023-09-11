const getDB = require('../../db/getDB');
const { generateError, deletePhoto } = require('../../helpers');

const deleteAboutMe = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idAboutMe } = req.params;

        const [aboutMes] = await connection.query(
            `SELECT * FROM aboutme WHERE id = ?`,
            [idAboutMe]
        );

        if (aboutMes.length < 1) {
            throw generateError('No existen registros de sobre mí', 404);
        }

        if (aboutMes[0].imageaboutme) {
            await deletePhoto(aboutMes[0].imageaboutme);
        }

        await connection.query(`DELETE FROM aboutme WHERE id = ?`, [idAboutMe]);
        res.send({
            status: 'Ok',
            message: `El registro sobre mí ha sido eliminado con éxito`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteAboutMe;
