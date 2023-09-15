import { useState, useRef } from "react";
import { useTokenContext } from "../Contexts/TokenContext";
import Imagen from "../Imagen";

const EditUserForm = ({ user, setUser }) => {
    const [username, setUsername] = useState("");
    const [newPass, setNewPass] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [newUserImage, setNewUserImage] = useState();
    const newUserImageRef = useRef();
    const { token } = useTokenContext();

    return (
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const file = newUserImageRef.current.files[0];
  
            if ( file || username || oldPass || newPass) {
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
            }
            setOldPass("");
            setNewPass("");

          } catch (error) {
            console.error(error.message);
          } finally {
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
          <img src={newUserImage} alt={username || user.username} />
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
        }}
      />
      </form>
    );
  };
  export default EditUserForm;