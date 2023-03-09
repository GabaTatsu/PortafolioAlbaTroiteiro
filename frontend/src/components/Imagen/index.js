import imageNotAvailable from "../../assets/icons/no-picture-available-icon.jpg";

const Imagen = ({ image, title }) => {
  return (
    <>
      {!image && <img src={imageNotAvailable} alt={title}></img>}
      {image && (
        <img
          src={`${process.env.REACT_APP_API_URL}/${image}`}
          alt={title}
        ></img>
      )}
    </>
  );
};
export default Imagen;
