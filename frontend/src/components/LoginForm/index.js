import { useState } from "react";
import { useTokenContext } from "../../components/Contexts/TokenContext";
import { useContext } from "react";
import { NavigationContext } from "../Contexts/NavigationContext";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setToken } = useTokenContext();
    const { setRedirectTo } = useContext(NavigationContext);

    const handleSubmit = async (event) => {
      try {
          event.preventDefault();

          const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
          });

          const body = await res.json();

          if (!res.ok) {
              throw new Error(body.message);
          }

          setToken(body.authToken);
          setRedirectTo("/Edit");
      } catch (error) {
          console.error(error.message);
      }
  };

    return (
      <form
      onSubmit={handleSubmit}
      >
        <label htmlFor="username">Nombre de Usuario:</label>
      <input
        id="username"
        type="username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label htmlFor="password">Contraseña:</label>
      <input
        id="password"
        type={"password"}
        autoComplete="off"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button type="submit">Iniciar sesión</button>
      </form>

    );
    
  };
  export default LoginForm;