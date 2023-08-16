const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const getWorks = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        let { category } = req.query;

        let works;
            [works] = await connection.query(
                `SELECT * FROM work WHERE category = ? ORDER BY orderer`,
                [category]
            );          
        
        if (!works || works.length < 1) {
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