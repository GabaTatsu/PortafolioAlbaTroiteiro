import { useState } from "react";
import { useTokenContext } from "../Contexts/TokenContext";
import "./style.css";

const EditAboutMeForm = ({ descriptionAboutMe, setDescriptionAboutMe, id }) => {
    const { token } = useTokenContext();
    const [editAboutMeForm, setEditAboutMeForm] = useState(false);
    const [newDescriptionAboutMe, setNewDescriptionAboutMe] = useState(descriptionAboutMe);
  
    return (
      <div className="editAboutMeform">
        {editAboutMeForm === false && (
          <button
            onClick={() => {
              setEditAboutMeForm(true);
            }}
          >
            Modificar
          </button>
        )}
        {editAboutMeForm === true && (
            <form
              onSubmit={async (event) => {
                try {
                  event.preventDefault();
  
                  if (newDescriptionAboutMe) {
                    const formData = new FormData();
  
                    formData.append("descriptionaboutme", newDescriptionAboutMe);
  
                  const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/aboutme/edit/${id}`,
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
                  if (newDescriptionAboutMe) {
                    setDescriptionAboutMe(newDescriptionAboutMe);
                  }
  
                  setEditAboutMeForm(false);
                }
                } catch (error) {
                  console.error(error.message);
                } finally {
                }
              }}
            >            
                <label htmlFor="descriptionaboutme">Descripción:</label>
                <input
                  id="descriptionaboutme"
                  value={newDescriptionAboutMe}
                  onChange={(event) => {
                    setNewDescriptionAboutMe(event.target.value);
                  }}
                />
                 
        <button type="submit">Modificar</button>
        <button
                  type="button"
                  onClick={() => {
                    setEditAboutMeForm(false);
                  }}
                >
                  Cancelar
          </button>
          </form>
        )}
        </div>
   
    );
}

export default EditAboutMeForm;