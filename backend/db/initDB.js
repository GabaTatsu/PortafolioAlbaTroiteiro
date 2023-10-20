const getDB = require('./getDB');
const bcrypt = require('bcrypt');

async function main() {
    let connection;

    try {
        connection = await getDB();
        const hashedPassword = await bcrypt.hash('1234', 10);

        console.log('Eliminando tablas...');

        await connection.query('DROP TABLE IF EXISTS work');
        await connection.query('DROP TABLE IF EXISTS aboutme');
        await connection.query('DROP TABLE IF EXISTS user');

        console.log('Tablas eliminadas!');

        console.log('Creando tablas...');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS user (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) NOT NULL,
                password VARCHAR(200) NOT NULL,
                userimage varchar(255)
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS work (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                description TEXT,
                image varchar(255),
                orderer INT,
                category INT,
                createdAt DATETIME,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES user (id)
                ON DELETE CASCADE
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS aboutme (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                descriptionaboutme TEXT,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES user (id)
                ON DELETE CASCADE
            )
        `);

        console.log('Tablas creadas!');
        console.log('Insertando datos de prueba...');

        await connection.query(
            `INSERT INTO user (username, password, userimage)
            VALUES ('Alba', '${hashedPassword}', 'MIKE6071.jpg')`
        );

        await connection.query(
            `INSERT INTO work (title, description, image, orderer, category, createdAt, idUser)
            VALUES ('trabajo1', 'trabajo1', '2034FDFD-574D-4821-9402-98561582E1D6.JPG', 1, 1, '2022-08-09 17:00:00', 1),
            ('trabajo2', 'trabajo2', '84664252-E5A7-4815-BC03-0A44987A1FFB.JPG', 2, 1, '2022-08-09 17:00:00', 1),
            ('trabajo3', 'trabajo3', 'corason.jpg', 3, 1, '2022-08-09 17:00:00', 1),
            ('trabajo4', 'trabajo4', 'DD2A8539-97C0-4AEC-A31D-EDEDF911AC84.JPG', 4, 1, '2022-08-09 17:00:00', 1),
            ('trabajo5', 'trabajo5', 'debajo del mar.jpg', 5, 1, '2022-08-09 17:00:00', 1),
            ('trabajo7', 'trabajo7', 'IMG-1624.JPG', 6, 1, '2022-08-09 17:00:00', 1),
            ('trabajo8', 'trabajo8', 'IMG-1785.jpg', 7, 1, '2022-08-09 17:00:00', 1),
            ('trabajo9', 'trabajo9', '0cf6a6bfc41844c68589d15be6299d33.mp4', 8, 1, '2022-08-09 17:00:00', 1),
            ('trabajo10', 'trabajo10', '834bb850fbbe40deaa0734fcf9868349.mp4', 9, 1, '2022-08-09 17:00:00', 1),
            ('trabajo11', 'trabajo11', '09191c65480e400aa4003b3381b0fb04.mp4', 10, 1, '2022-08-09 17:00:00', 1),
            ('retrato1', 'retrato1', 'IMG-3585.JPG', 1, 0, '2022-08-09 17:00:00', 1),
            ('retrato2', 'retrato2', 'IMG-4436.jpg', 2, 0, '2022-08-09 17:00:00', 1),
            ('retrato3', 'retrato3', 'IMG-5544.JPG', 3, 0, '2022-08-09 17:00:00', 1),
            ('retrato4', 'retrato4', 'IMG-9516.JPG', 4, 0, '2022-08-09 17:00:00', 1),
            ('retrato5', 'retrato5', 'iria e sebas.jpg', 5, 0, '2022-08-09 17:00:00', 1),
            ('retrato6', 'retrato6', 'parella.jpg', 6, 0, '2022-08-09 17:00:00', 1),
            ('retrato7', 'retrato7', 'yuri.jpg', 7, 0, '2022-08-09 17:00:00', 1),
            ('retrato8', 'retrato8', 'D0E6A152-6B1C-4A38-BF62-FE6F2B5121EA.JPG', 8, 0, '2022-08-09 17:00:00', 1),
            ('dibujo1', 'dibujo1', 'IMG-1785 (copia).jpg', 1, 2, '2022-08-09 17:00:00', 1),
            ('dibujo2', 'dibujo2', 'IMG-3585 (copia).JPG', 2, 2, '2022-08-09 17:00:00', 1),
            ('dibujo3', 'dibujo3', 'IMG-4436 (copia).jpg', 3, 2, '2022-08-09 17:00:00', 1),
            ('dibujo4', 'dibujo4', 'IMG-5544 (copia).JPG', 4, 2, '2022-08-09 17:00:00', 1),
            ('dibujo5', 'dibujo5', 'IMG-9516 (copia).JPG', 5, 2, '2022-08-09 17:00:00', 1),
            ('dibujo6', 'dibujo6', 'iria e sebas (copia).jpg', 6, 2, '2022-08-09 17:00:00', 1),
            ('dibujo7', 'dibujo7', 'MIKE6071 (copia).jpg', 7, 2, '2022-08-09 17:00:00', 1),
            ('dibujo8', 'dibujo8', 'parella (copia).jpg', 8, 2, '2022-08-09 17:00:00', 1)`
        );

        await connection.query(
            `INSERT INTO aboutme (descriptionaboutme, idUser)
            VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br> <br> Mauris et eros porta, dignissim urna eget, malesuada nisi. Sed risus dui, vehicula sit amet dui nec, eleifend cursus neque. Fusce aliquam vehicula sagittis. Nam fringilla ut libero a laoreet. Maecenas id accumsan ligula. Vestibulum pulvinar tortor urna, sed tristique turpis porta at. Mauris auctor pellentesque blandit. Praesent tincidunt lacus nec ipsum ultrices aliquet. Aliquam non lacus at nulla dapibus pellentesque.', 1),
            ('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et eros porta, dignissim urna eget, malesuada nisi. Sed risus dui, vehicula sit amet dui nec, eleifend cursus neque. Fusce aliquam vehicula sagittis. Nam fringilla ut libero a laoreet. Maecenas id accumsan ligula. Vestibulum pulvinar tortor urna, sed tristique turpis porta at. Mauris auctor pellentesque blandit. Praesent tincidunt lacus nec ipsum ultrices aliquet. Aliquam non lacus at nulla dapibus pellentesque.', 1)`
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
