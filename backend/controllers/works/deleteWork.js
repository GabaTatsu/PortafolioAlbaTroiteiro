const getDB = require('../../db/getDB');
const { generateError, deletePhoto } = require('../../helpers');

const deleteWork = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idWork } = req.params;

        const [works] = await connection.query(
            `SELECT * FROM work WHERE id = ?`,
            [idWork]
        );

        if (works.length < 1) {
            throw generateError('No existe el trabajo seleccionado', 404);
        }

        await connection.query(
            `UPDATE work SET orderer = orderer - 1 WHERE category = ? AND orderer > ?`,
            [
                works[0].category,
                works[0].orderer,
            ]
        );

        if (works[0].image) {
            await deletePhoto(works[0].image);
        }

        await connection.query(`DELETE FROM work WHERE id = ?`, [idWork]);
        res.send({
            status: 'Ok',
            message: `El enlace con título "${works[0].title}", ha sido eliminado con éxito`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteWork;
