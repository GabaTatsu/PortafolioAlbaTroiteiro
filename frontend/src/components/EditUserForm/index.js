import { useState, useRef, useContext } from "react";
import { useTokenContext } from "../Contexts/TokenContext";
import Imagen from "../Imagen";
import { AlertContext } from "../Contexts/AlertContext";
import Spinner from "../Spinner";
import ImagePreview from "../ImagePreview";

const EditUserForm = ({ user, setUser }) => {
    const [username, setUsername] = useState("");
    const [newPass, setNewPass] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [newUserImage, setNewUserImage] = useState();
    const newUserImageRef = useRef();
    const { token } = useTokenContext();
    const [loading, setLoading] = useState(false);
    const { setAlert } = useContext(AlertContext);
    const [isVideo, setIsVideo] = useState("");

    return (
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            setLoading(true);
            const file = newUserImageRef.current.files[0];
  
              const formData = new FormData();

                  formData.append("userimage", file);
                  formData.append("username", username);
                  formData.append("oldPass", oldPass);
                  formData.append("newPass", newPass);

              const res = await fetch(
                `${process.env.REACT_APP_API_URL}/users/edit`,
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
  
              setUser({
                ...user,
                username: username || user.username,
                password: newPass || user.password,
                userimage: newUserImage || user.userimage,
              });
            
            setOldPass("");
            setNewPass("");
            setAlert({ type: "success", msg: body.message });

          } catch (error) {
            console.error(error.message);
            setAlert({ type: "error", msg: error.message });
          } finally {
            setLoading(false);
          }
        }}
      >
          <aside>        
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            id="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            placeholder={user.username}
          />

            <label htmlFor="oldPass">Vieja contraseña:</label>
            <input
              id="oldPass"
              autoComplete="off"
              value={oldPass}
              onChange={(event) => {
                setOldPass(event.target.value);
              }}
            />
            <label htmlFor="newPass">Nueva contraseña:</label>
            <input
              id="newPass"
              autoComplete="off"
              value={newPass}
              onChange={(event) => {
                setNewPass(event.target.value);
              }}
            />
            <button type="submit">Guardar Cambios</button>
          </aside> 
            <label htmlFor="userimage">
        {!newUserImage && (
          <Imagen image={user.userimage} title={username || user.username} />
        )}
        {newUserImage && (
          <ImagePreview isVideo={isVideo} image={newUserImage} title={username || user.username} />
        )}
      </label>
      <input
        id="userimage"
        type="file"
        hidden
        ref={newUserImageRef}
        onChange={() => {
          const file = newUserImageRef.current.files[0];
          setNewUserImage(URL.createObjectURL(file));
          if (file && file.type && file.type.startsWith('video/')){
            setIsVideo("video");
          } else if (file && file.type && file.type.startsWith('image/')) {
            setIsVideo("imagen");
          } else {
            setIsVideo("otro");
          }
        }}
      />
      {loading && <Spinner />}
      </form>
    );
  };
  export default EditUserForm;