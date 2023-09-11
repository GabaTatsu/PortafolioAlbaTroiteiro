import { useTokenContext } from "../Contexts/TokenContext";
import { useState, useRef } from "react";
import Imagen from "../Imagen";

const NewAboutMeForm = ({adAboutMe}) => {
    const [descriptionAboutMe, setDescriptionAboutMe] = useState("");
    const [imageNewAboutMe, setImageNewAboutMe] = useState("");
  const { token } = useTokenContext();
  const newImageAbouMeRef = useRef();

    return(
        <>
        <form
          onSubmit={async (event) => {
            try {
              event.preventDefault();
              const file = newImageAbouMeRef.current.files[0];
  
              if (file && descriptionAboutMe) {
                    const formData = new FormData();
  
                    formData.append("imageAboutMe", file);
                    formData.append("descriptionAboutMe", descriptionAboutMe);
  
                  const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/aboutme/new`,
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
                    descriptionaboutme: descriptionAboutMe,
                    id: body.data.newId,
                    idUser: 1,
                    imageaboutme: body.data.imageName,                    
                  };
                  adAboutMe({newObject})
                  setImageNewAboutMe("")
                }
                } catch (error) {
                  console.error(error.message);
                } finally {
                }
              }}
        >
          <label htmlFor="descriptionAboutMe">Descripción:</label>
          <input
            id="descriptionAboutMe"
            value={descriptionAboutMe}
            onChange={(event) => {
              setDescriptionAboutMe(event.target.value);
            }}
          />
                <label htmlFor="imageNewAboutMe">
                {!imageNewAboutMe && (
            <Imagen image={imageNewAboutMe} title={imageNewAboutMe} />
          )}
          {imageNewAboutMe && (
            <img src={imageNewAboutMe} alt={imageNewAboutMe} />
          )}
        </label>
        <input
          id="imageNewAboutMe"
          type="file"
          hidden
          ref={newImageAbouMeRef}
          onChange={() => {
            const file = newImageAbouMeRef.current.files[0];
            setImageNewAboutMe(URL.createObjectURL(file));
          }}
        />
          <button>Publicar trabajo</button>
        </form>
      </>
    );
}

export default NewAboutMeForm;