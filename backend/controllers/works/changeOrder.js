const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const deleteWork = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idWork } = req.params;
        const { ordererDirection } = req.body;

        const [work] = await connection.query(
            `SELECT * FROM work WHERE id = ?`,
            [idWork]
        );

        if (work.length < 1) {
            throw generateError('No existe el trabajo seleccionado', 404);
        }

        if (ordererDirection === 0){
            const preOrderer = work[0].orderer - 1

            if (preOrderer === 0) {
                throw generateError('Ya es el primer trabajo', 400);
            }

            await connection.query(
                `UPDATE work SET orderer = orderer + 1 WHERE category = ? AND orderer = ?`,
                [
                    work[0].category,
                    preOrderer,
                ]
            );

            await connection.query(
                `UPDATE work SET orderer = orderer - 1 WHERE id = ?`,
                [
                    idWork,
                ]
            );

        } else {
            const postOrderer = work[0].orderer + 1
            const [lastOrderer] = await connection.query(
                `SELECT MAX(orderer) as maxOrderer FROM work WHERE category = ?`,
                [
                    work[0].category,
                ]
            );

            if (postOrderer === lastOrderer[0].maxOrderer + 1) {
                throw generateError('Ya es el último trabajo', 400);
            }

            await connection.query(
                `UPDATE work SET orderer = orderer - 1 WHERE category = ? AND orderer = ?`,
                [
                    work[0].category,
                    postOrderer,
                ]
            ); 

            await connection.query(
                `UPDATE work SET orderer = orderer + 1 WHERE id = ?`,
                [
                    idWork,
                ]
            );
        }

        res.send({
            status: 'Ok',
            message: `El enlace ha sido modificado con éxito`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteWork;
