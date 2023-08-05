const getDB = require('./getDB');
const bcrypt = require('bcrypt');

async function main() {
    let connection;

    try {
        connection = await getDB();
        const hashedPassword = await bcrypt.hash('1234', 10);

        console.log('Eliminando tablas...');

        await connection.query('DROP TABLE IF EXISTS work');
        await connection.query('DROP TABLE IF EXISTS user');

        console.log('Tablas eliminadas!');

        console.log('Creando tablas...');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS user (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) NOT NULL,
                password VARCHAR(200) NOT NULL
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS work (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                description TEXT,
                image varchar(255),
                orderer INT,
                category BOOLEAN,
                createdAt DATETIME,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES user (id)
                ON DELETE CASCADE
            )
        `);

        console.log('Tablas creadas!');
        console.log('Insertando datos de prueba...');

        await connection.query(
            `INSERT INTO user (username, password)
            VALUES ('user', '${hashedPassword}')`
        );

        await connection.query(
            `INSERT INTO work (title, description, image, orderer, category, createdAt, idUser)
            VALUES ('trabajo1', 'trabajo1', '2034FDFD-574D-4821-9402-98561582E1D6.JPG', 1, true, '2022-08-09 17:00:00', 1),
            ('trabajo2', 'trabajo2', '84664252-E5A7-4815-BC03-0A44987A1FFB.JPG', 2, true, '2022-08-09 17:00:00', 1),
            ('trabajo3', 'trabajo3', 'corason.jpg', 3, true, '2022-08-09 17:00:00', 1),
            ('trabajo4', 'trabajo4', 'DD2A8539-97C0-4AEC-A31D-EDEDF911AC84.JPG', 4, true, '2022-08-09 17:00:00', 1),
            ('trabajo5', 'trabajo5', 'debajo del mar.jpg', 5, true, '2022-08-09 17:00:00', 1),
            ('trabajo6', 'trabajo6', 'Ilustración-sin-título.JPG', 6, true, '2022-08-09 17:00:00', 1),
            ('trabajo7', 'trabajo7', 'IMG-1624.JPG', 7, true, '2022-08-09 17:00:00', 1),
            ('trabajo8', 'trabajo8', 'IMG-1785.jpg', 8, true, '2022-08-09 17:00:00', 1),
            ('retrato1', 'retrato1', 'IMG-3585.JPG', 1, false, '2022-08-09 17:00:00', 1),
            ('retrato2', 'retrato2', 'IMG-4436.jpg', 2, false, '2022-08-09 17:00:00', 1),
            ('retrato3', 'retrato3', 'IMG-5544.JPG', 3, false, '2022-08-09 17:00:00', 1),
            ('retrato4', 'retrato4', 'IMG-9516.JPG', 4, false, '2022-08-09 17:00:00', 1),
            ('retrato5', 'retrato5', 'iria e sebas.jpg', 5, false, '2022-08-09 17:00:00', 1),
            ('retrato6', 'retrato6', 'parella.jpg', 6, false, '2022-08-09 17:00:00', 1),
            ('retrato7', 'retrato7', 'yuri.jpg', 7, false, '2022-08-09 17:00:00', 1),
            ('retrato8', 'retrato8', 'D0E6A152-6B1C-4A38-BF62-FE6F2B5121EA.JPG', 8, false, '2022-08-09 17:00:00', 1)`
        );

        console.log('Datos de prueba insertados con exito!');
    } catch (error) {
        console.error(error.message);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();
