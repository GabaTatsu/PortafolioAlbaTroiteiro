import Imagen from "../Imagen";
import { useTokenContext } from "../Contexts/TokenContext";
import AlertDeleteWork from "../AlertDeleteWork";

const Work = ({ work, deleteWork }) => {
  const { loggedUser } = useTokenContext();
  const { title, description, image, id} = work;

  return (
    <>
    <article>
      <h3>{title}</h3>
      <p>{description}</p> 
      {loggedUser && <AlertDeleteWork id={id} title={title} deleteWork={deleteWork}></AlertDeleteWork>}
        
    </article>
    <Imagen image={image} title={title}></Imagen>
    </>
  );
};
export default Work;
