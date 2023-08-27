const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getAboutMe = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();
  
        const [aboutMe] = await connection.query(
            `SELECT * FROM aboutme`
        );

        if (!aboutMe) {
            throw generateError('No existe ningún registro sobre mi', 404);
        }

        const [contact] = await connection.query(
            `SELECT * FROM contact`
        );

        if (!contact) {
            throw generateError('No existe ningún registro de conatcto', 404);
        }

        res.send({
            status: 'Ok',
            data: {aboutMe, contact},
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getAboutMe;
