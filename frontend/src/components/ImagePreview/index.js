import imageNotAvailable from "../../assets/icons/no-picture-available-icon.jpg";
import imageNotValid from "../../assets/icons/NotValid.png";

const ImagePreview = ({ image, title, isVideo }) => {

  return (
    <>
    {!image &&  <img
          src={imageNotAvailable}
          alt={title}
        />}
        {image && isVideo === "otro" && <img
          src={imageNotValid}
          alt={title}
        />}
        {isVideo === "video" && (
           <video
           autoPlay
           loop
           muted
           playsInline
           controls={false}
         >
           <source src={image} type="video/mp4" />
         </video>
        )}
        {isVideo === "imagen" && (
          <img
          src={image}
          alt={title}
        />
        )}
    </>
  );
};

export default ImagePreview;
