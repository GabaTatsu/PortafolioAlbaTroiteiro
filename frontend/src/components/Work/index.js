import Imagen from "../Imagen";
import { useTokenContext } from "../Contexts/TokenContext";
import AlertDeleteWork from "../AlertDeleteWork";
import EditWorkForm from "../EditWorkForm";
import { useState } from "react";
import ChangeOrder from "../ChangeOrder";

const Work = ({ work, deleteWork, reorder, setLoading }) => {
  const { loggedUser } = useTokenContext();
  const { title, description, image, id, orderer, category, createdAt} = work;
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editImage, setEditImage] = useState(image);
  const [editWorkForm, setEditWorkForm] = useState(false);

  return (
    <>
    <article>
    {!editWorkForm && (
        <>
        <h3>{editTitle}</h3>
      <p>{editDescription}</p>
      </>
      )}
      {!editWorkForm && loggedUser && (
        <>
      <p>{createdAt.split("T")[0]}</p>
      {category === 0 && <p>RETRATO</p>}
      {category === 1 && <p>TRABAJO</p>}
      {category === 2 && <p>DIBUJO</p>}
      <p>ORDEN:{orderer}º</p>
      <ChangeOrder id={id} reorder={reorder} setLoading={setLoading}></ChangeOrder>
      <AlertDeleteWork id={id} title={title} deleteWork={deleteWork}></AlertDeleteWork>
      </>
      )}       
      {loggedUser && (
        <>     
      <EditWorkForm id={id} deleteWork={deleteWork} setEditTitle={setEditTitle} editTitle={editTitle} setEditDescription={setEditDescription} editDescription={editDescription} setEditImage={setEditImage} editImage={editImage} editWorkForm={editWorkForm} setEditWorkForm={setEditWorkForm} category={category} ></EditWorkForm>
      </>
      )}
     </article>
    <Imagen image={editImage} title={editTitle}></Imagen>
    </>
  );
};
export default Work;
