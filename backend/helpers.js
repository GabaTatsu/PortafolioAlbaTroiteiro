const { unlink } = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');
const fs = require('fs/promises');
const ffmpeg = require('fluent-ffmpeg');

const filesDir = path.join(__dirname, 'static');


function generateError(message, code) {
    const error = new Error(message);
    error.httpStatus = code;
    return error;
}

async function deleteFile(fileName) {
    try {
        let filePath;

        filePath = path.join(filesDir, fileName);

        await unlink(filePath);
    } catch (error) {
        throw new Error('Error al eliminar el archivo del servidor');
    }
}

async function saveFile(fileName) {
    const fileExtension = path.extname(fileName.name).toLowerCase();

    if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.tiff', '.tif', '.bmp', '.svg'].includes(fileExtension)) {

        return saveImage(fileName);
    } else if (['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv', '.webm', '.mpeg', '.mpg'].includes(fileExtension)) {

        return saveVideo(fileName);
    } else {
        throw new Error('Formato de archivo no admitido');
    }
}

async function saveImage(imagen) {
    try {
        const sharpImage = sharp(imagen.data);
        sharpImage.resize({
            width: 1500,
            height: 1500,
            fit: sharp.fit.inside,
        });

        let imageDirectory;
        const imageName = uuid.v4() + '.jpg';

        imageDirectory = path.join(filesDir, imageName);

        await sharpImage.toFile(imageDirectory);
        return imageName;
    } catch (error) {
        throw new Error('Error al procesar la imagen');
    }
}

async function saveVideo(video) {
    try {
        const videoName = uuid.v4() + '.mp4';
        const videoOutputDirectory = path.join(filesDir, videoName);
        const videoDirectory = path.join(filesDir, video.name);

        await fs.writeFile(videoDirectory, video.data);

        return new Promise((resolve, reject) => {
            ffmpeg(videoDirectory)
                .output(videoOutputDirectory)
                .size('1200x?')
                .videoCodec('libx264')
                .audioCodec('aac')
                .on('end', async () => {
                    await unlink(videoDirectory);
                    resolve(videoName);
                })
                .on('error', (err) => {
                    reject(new Error('Error al procesar el video: ' + err.message));
                })
                .run();
        });
    } catch (error) {
        throw new Error('Error al procesar el video: ' + error.message);
    }
}

module.exports = {
    generateError,
    deleteFile,
    saveFile,
};
