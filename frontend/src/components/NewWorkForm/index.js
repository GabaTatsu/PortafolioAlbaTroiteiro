import { useTokenContext } from "../Contexts/TokenContext";
import { useState, useRef } from "react";

const NewWorkForm = ({adWork}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const { token } = useTokenContext();
  const newImageRef = useRef();

  return (
    <>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const file = newImageRef.current.files[0];

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

                adWork({newObject})

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
              </select>
              <label htmlFor="image">
          <img src={image} alt="previo"></img>
      </label>
      <input
        id="image"
        type="file"
        hidden
        ref={newImageRef}
        onChange={() => {
          const file = newImageRef.current.files[0];
          setImage(URL.createObjectURL(file));
        }}
      />
        <button>Publicar trabajo</button>
      </form>
    </>
  );
};

export default NewWorkForm;