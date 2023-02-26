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
            `INSERT INTO work (title, description, category, createdAt, idUser)
            VALUES ('Wikipedia', 'Enciclopedia libre true', true, '2022-08-09 17:00:00', 1),
            ('Netflix', 'Streaming Masivo true', true, '2022-08-12 17:00:00', 1),
            ('Facebook', 'Red social masiva', false, '2021-10-29 17:00:00', 1),
            ('Gitlab', 'Pagina de Repositorios', false, '2012-06-09 17:00:00', 1)`
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
