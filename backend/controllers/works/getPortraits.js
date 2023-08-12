const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const getPortraits = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        let works;
            [works] = await connection.query(
                `SELECT * FROM work WHERE category = 0 ORDER BY orderer`
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

module.exports = getPortraits;