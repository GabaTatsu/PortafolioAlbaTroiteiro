import imageNotAvailable from '../../assets/icons/no-picture-available-icon.jpg';
import imageNotValid from '../../assets/icons/NotValid.png';

const Imagen = ({ image, title }) => {
    const isVideos =
        image && /\.(mp4|avi|mov|mkv|wmv|flv|webm|mpeg|mpg)$/i.test(image);
    const isImage =
        image && /\.(jpg|jpeg|png|gif|webp|tiff|tif|bmp|svg)$/i.test(image);

    return (
        <>
            {!image && <img src={imageNotAvailable} alt={title} />}
            {image && !isVideos && !isImage && (
                <img src={imageNotValid} alt={title} />
            )}
            {isVideos && (
                <video autoPlay loop muted playsInline controls={false}>
                    <source
                        src={`${process.env.REACT_APP_API_URL}/${image}`}
                        type="video/mp4"
                    />
                </video>
            )}
            {isImage && (
                <img
                    src={`${process.env.REACT_APP_API_URL}/${image}`}
                    alt={title}
                />
            )}
        </>
    );
};

export default Imagen;
