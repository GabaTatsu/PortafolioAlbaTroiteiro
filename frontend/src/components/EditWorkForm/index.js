import { useState, useRef } from "react";
import "./style.css";
import { useTokenContext } from "../Contexts/TokenContext";
import Imagen from "../Imagen";

const EditWorkForm = ({id, deleteWork, setEditTitle, editTitle, setEditDescription, editDescription, setEditImage, editImage, setEditWorkForm, editWorkForm, category}) => {
  const { token } = useTokenContext();
  const [title, setTitle] = useState(editTitle);
  const [description, setDescription] = useState(editDescription);
  const [newImage, setNewImage] = useState();
  const [newCategory, setNewCategory] = useState(category);
  const newImageRef = useRef();

  return (
    <div className="editform">
      {editWorkForm === false && (
        <button
          onClick={() => {
            setEditWorkForm(true);
          }}
        >
          Modificar
        </button>
      )}
      {editWorkForm === true && (
          <form
            onSubmit={async (event) => {
              try {
                event.preventDefault();
                const file = newImageRef.current.files[0];

                if (file || title || description) {
                  const formData = new FormData();

                  formData.append("imagen", file);
                  formData.append("title", title);
                  formData.append("description", description);
                  formData.append("category", newCategory);

                const res = await fetch(
                  `${process.env.REACT_APP_API_URL}/works/${id}`,
                  {
                    method: "PUT",
                    headers: {
                      Authorization: token,
                    },
                    body: formData,
                  }
                );

                const body = await res.json();
                if (!res.ok) {
                  throw new Error(body.message);
                }

                if (title) {
                  setEditTitle(title);
                }
                if (description) {
                  setEditDescription(description);
                }
                if (newImage) {
                  setEditImage(body.data);
                  setNewImage("")
                }
                if (newCategory !== category) {                  
                  deleteWork(id);
                }

                setEditWorkForm(false);
              }
              } catch (error) {
                console.error(error.message);
              } finally {
              }
            }}
          >            
              <label htmlFor="title">Título:</label>
              <input
                id="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
              <label htmlFor="description">Descripción:</label>
              <input
                id="description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
              <label htmlFor="category">Categoría:</label>
              <select 
              id="category"
              value={newCategory}
              onChange={(event) => {
                setNewCategory(event.target.value);
              }}
              >
                <option value="0">RETRATO</option>
                <option value="1">TRABAJO</option>
                <option value="2">DIBUJO</option>
              </select>
               <label htmlFor="image">
        {!newImage && (
          <Imagen image={editImage} title={editTitle} />
        )}
        {newImage && (
          <img src={newImage} alt={title || editTitle} />
        )}
      </label>
      <input
        id="image"
        type="file"
        hidden
        ref={newImageRef}
        onChange={() => {
          const file = newImageRef.current.files[0];
          setNewImage(URL.createObjectURL(file));
        }}
      />
      <button type="submit">Modificar</button>
      <button
                type="button"
                onClick={() => {
                  setEditWorkForm(false);
                }}
              >
                Cancelar
        </button>
        </form>
      )}
      </div>
 
  );
};
export default EditWorkForm;