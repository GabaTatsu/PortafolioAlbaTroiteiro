import Imagen from "../Imagen";

const Work = ({ work }) => {
  const { title, description, image, createdAt, id, idUser, category } = work;
  return (
    <article>
      <h3>{title}</h3>
      <p>{createdAt}</p>
      <p>{description}</p>
      <p>{id}</p>
      <p>{idUser}</p>
      <p>{category}</p>
      <Imagen image={image} title={title}></Imagen>
    </article>
  );
};
export default Work;
