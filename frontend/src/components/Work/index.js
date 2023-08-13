import Imagen from "../Imagen";
import { useTokenContext } from "../Contexts/TokenContext";
import AlertDeleteWork from "../AlertDeleteWork";
import EditWorkForm from "../EditWorkForm";
import { useState } from "react";

const Work = ({ work, setWorks, setPortraits, deleteWork }) => {
  const { loggedUser } = useTokenContext();
  const { title, description, image, id, orderer, category, createdAt} = work;
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editImage, setEditImage] = useState(image)

  return (
    <>
    <article>
      <h3>{editTitle}</h3>
      <p>{editDescription}</p> 
      {loggedUser && (
        <>
      <p>{createdAt.split("T")[0]}</p>
      {category === 0 && <p>RETRATO</p>}
      {category === 1 && <p>TRABAJO</p>}
      <p>ORDEN:{orderer}º</p>
      <AlertDeleteWork id={id} title={title} deleteWork={deleteWork}></AlertDeleteWork>
      <EditWorkForm id={id} setEditTitle={setEditTitle} editTitle={editTitle} setEditDescription={setEditDescription} editDescription={editDescription} setEditImage={setEditImage} editImage={editImage} ></EditWorkForm>
      </>
      )}
     </article>
    <Imagen image={editImage} title={editTitle}></Imagen>
    </>
  );
};
export default Work;
