import { useTokenContext } from "../Contexts/TokenContext";
import { useState, useRef } from "react";
import Imagen from "../Imagen";
import addIcon from "../../assets/icons/icons8-plus-144.png"
import "./style.css";

const NewWorkForm = ({works, adWork}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);
  const [imageNewWork, setImageNewWork] = useState("");
  const [showNewWork, setShowNewWork] = useState(false);
  const { token , loggedUser } = useTokenContext();
  const newImageWorkRef = useRef();

  return (
    <div className="addwork">
    {loggedUser && showNewWork === false && (
      <button
        onClick={() => {
          setShowNewWork(true);
        }}
      >
        <img src={addIcon} alt="AÑADIR" ></img>
      </button>
    )}
    
    {loggedUser && showNewWork === true && ( 
    <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const file = newImageWorkRef.current.files[0];

                  const formData = new FormData();

                  formData.append("image", file);
                  formData.append("title", title);
                  formData.append("description", description);
                  formData.append("category", category);

                const res = await fetch(
                  `${process.env.REACT_APP_API_URL}/works/new`,
                  {
                    method: "POST",
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

                if(works[0].category === category) {
                  const newObject = {
                    id: body.data.newId,
                    title,
                    description,
                    image: body.data.imageName,
                    category,
                    idUser: 1,
                  };
                  adWork({newObject}); 
                } else {
                  if (category === 0){
                    window.location.href = "/Portraits";
                  } else if (category === 1) {
                    window.location.href = "/";
                  } else {
                    window.location.href = "/Drawings";
                  }
                }
                
                setTitle("");
                setDescription("");
                setCategory(0);
                setImageNewWork("");
              } catch (error) {
                console.error(error.message);
              } finally {
              }
            }}
      >
        <article>
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
              value={category}
              onChange={(event) => {
                setCategory(parseInt(event.target.value));
              }}
              >
                <option value="0">RETRATO</option>
                <option value="1">TRABAJO</option>
                <option value="2">DIBUJO</option>
              </select>
              <button type="submit">Publicar trabajo</button>
        <button
                type="button"
                onClick={() => {
                  setShowNewWork(false);
                }}
              >
                Cancelar
        </button>
        </article>
              <label htmlFor="imageNewWork">
              {!imageNewWork && (
          <Imagen image={imageNewWork} title={title} />
        )}
        {imageNewWork && (
          <img src={imageNewWork} alt={title} />
        )}
      </label>
      <input
        id="imageNewWork"
        type="file"
        hidden
        ref={newImageWorkRef}
        onChange={() => {
          const file = newImageWorkRef.current.files[0];
          setImageNewWork(URL.createObjectURL(file));
        }}
      />
      </form>
      )}
      </div>
  );
};

export default NewWorkForm;