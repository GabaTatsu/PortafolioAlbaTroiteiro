import { useTokenContext } from "../Contexts/TokenContext";
import { useState, useContext } from "react";
import addIcon from "../../assets/icons/icons8-plus-144.png"
import Spinner from "../Spinner";
import { AlertContext } from "../Contexts/AlertContext";

const NewAboutMeForm = ({adAboutMe}) => {
    const [descriptionAboutMe, setDescriptionAboutMe] = useState("");
  const { token, loggedUser } = useTokenContext();
  const [showNewAboutMe, setShowNewAboutMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

    return(
<div className="addwork">
    {loggedUser && showNewAboutMe === false && (
      <button
        onClick={() => {
          setShowNewAboutMe(true);
        }}
      >
        <img src={addIcon} alt="AÑADIR" ></img>
      </button>
    )}
    
    {loggedUser && showNewAboutMe === true && (
        <form
          onSubmit={async (event) => {
            try {
              event.preventDefault();
              setLoading(true);
  
              if (descriptionAboutMe) {
                    const formData = new FormData();
  
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
                  };
                  adAboutMe({newObject})
                  setAlert({ type: "success", msg: body.message });
                }
                } catch (error) {
                  console.error(error.message);
                  setAlert({ type: "error", msg: error.message });
                } finally {
                  setLoading(false);
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
                <button
                type="button"
                onClick={() => {
                  setShowNewAboutMe(false);
                }}
              >
                Cancelar
        </button>
          <button>Publicar trabajo</button>
        </form>
      )}
      {loading && <Spinner />}
      </div>
    );
}

export default NewAboutMeForm;