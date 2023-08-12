import { useState } from "react";
import { useTokenContext } from "../Contexts/TokenContext";

const EditUserForm = ({ user, setUser }) => {
    const [username, setUsername] = useState("");
    const [newPass, setNewPass] = useState("");
    const [oldPass, setOldPass] = useState("");
    const { token } = useTokenContext();

    return (
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            let body;
  
            if ( username || oldPass || newPass) {

              const res = await fetch(
                `${process.env.REACT_APP_API_URL}/users/edit`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ username, oldPass, newPass }),
                }
              );
  
              body = await res.json();
  
              if (!res.ok) {
                throw new Error(body.message);
              }
  
              setUser({
                ...user,
                username: username || user.username,
                password: newPass || user.password,
              });
            }
            setOldPass("");
            setNewPass("");
  
            if (!body) {
              throw new Error("No se ha modificado ningún dato");
            }
          } catch (error) {
            console.error(error.message);
          } finally {
          }
        }}
      >
        
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
      </form>
    );
  };
  export default EditUserForm;