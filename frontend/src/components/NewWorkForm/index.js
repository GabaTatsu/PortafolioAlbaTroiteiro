import { useTokenContext } from "../Contexts/TokenContext";
import { useState, useRef } from "react";
import Imagen from "../Imagen";

const NewWorkForm = ({adWork}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageNewWork, setImageNewWork] = useState("");
  const { token } = useTokenContext();
  const newImageWorkRef = useRef();

  return (
    <>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const file = newImageWorkRef.current.files[0];

            if (file && title && category) {
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

                const newObject = {
                  id: body.data.newId,
                  title,
                  description,
                  image: body.data.imageName,
                  category,
                  idUser: 1,
                };

                adWork({newObject}); 
                setImageNewWork("")
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
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
              >
                <option value="0">RETRATO</option>
                <option value="1">TRABAJO</option>
                <option value="2">DIBUJO</option>
              </select>
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
        <button>Publicar trabajo</button>
      </form>
    </>
  );
};

export default NewWorkForm;