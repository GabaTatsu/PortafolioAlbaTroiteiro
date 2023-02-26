const { unlink } = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');

const imagesDir = path.join(__dirname, 'static');

function generateError(message, code) {
    const error = new Error(message);
    error.httpStatus = code;
    return error;
}

async function deletePhoto(photoName) {
    try {
        let photoPath;

        photoPath = path.join(imagesDir, photoName);

        await unlink(photoPath);
    } catch (error) {
        throw new Error('Error al eliminar la imagen del servidor');
    }
}

async function savePhoto(imagen) {
    try {
        const sharpImage = sharp(imagen.data);
        let imageDirectory;
        const imageName = uuid.v4() + '.jpg';

        imageDirectory = path.join(imagesDir, imageName);

        await sharpImage.toFile(imageDirectory);
        return imageName;
    } catch (error) {
        throw new Error('Error al procesar la imagen');
    }
}

module.exports = {
    generateError,
    deletePhoto,
    savePhoto,
};
