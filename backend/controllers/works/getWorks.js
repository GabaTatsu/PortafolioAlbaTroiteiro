const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const getWorks = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();
        const { category } = req.body;

        let works;

        if (!category) {
            [works] = await connection.query(`SELECT * FROM work`);
        }

        if (category) {
            [works] = await connection.query(
                `SELECT * FROM work WHERE category = ?`,
                [category]
            );
        }

        if (works.length < 1) {
            throw generateError('No hay trabajos guardados', 404);
        }

        res.send({
            status: 'Ok',
            data: works,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getWorks;
