import imageNotAvailable from "../../assets/icons/no-picture-available-icon.jpg";

const Imagen = ({ image, title }) => {
  const isVideo = image && image.endsWith(".mp4");
  return (
    <>
      {isVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          controls={false}
        >
          <source src={`${process.env.REACT_APP_API_URL}/${image}`} type="video/mp4" />
        </video>
      ) : (
        <img
          src={`${process.env.REACT_APP_API_URL}/${image}` || imageNotAvailable}
          alt={title}
        />
      )}
    </>
  );
};

export default Imagen;
