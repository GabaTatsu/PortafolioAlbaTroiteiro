import Imagen from "../Imagen";

const Work = ({ work }) => {
  const { title, description, image} = work;
  return (
    <>
    <article>
      <h3>{title}</h3>
      <p>{description}</p>      
    </article>
    <Imagen image={image} title={title}></Imagen>
    </>
  );
};
export default Work;
