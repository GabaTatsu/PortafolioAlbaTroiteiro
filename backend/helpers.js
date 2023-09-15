const { unlink } = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');
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
    const fileExtension = path.extname(fileName.originalname).toLowerCase();

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
        const videoPath = path.join(filesDir, videoName);


        ffmpeg()
            .input(video.buffer)
            .inputFormat('mp4', 'avi', 'mov', 'mkv', 'wmv', 'flv', 'webm', 'mpeg', 'mpg')
            .outputOptions([
                `-vf "scale=1200:1200"`,
                '-c:v h264',
                '-pix_fmt yuv420p',
                '-movflags +faststart'
            ])
            .toFormat('mp4') 
            .on('end', () => {
                console.log('Procesamiento de video completado');
            })
            .on('error', (err) => {
                throw new Error('Error al procesar el video');
            })
            .save(videoPath);

        return videoName;
    } catch (error) {
        throw new Error('Error al procesar el video');
    }
}

module.exports = {
    generateError,
    deleteFile,
    saveFile,
};
