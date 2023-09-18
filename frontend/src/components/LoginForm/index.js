import { useState, useContext } from "react";
import { useTokenContext } from "../../components/Contexts/TokenContext";
import Spinner from "../Spinner";
import { AlertContext } from "../Contexts/AlertContext";

const LoginForm = ({setShow}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setToken } = useTokenContext();
    const [loading, setLoading] = useState(false);
    const { setAlert } = useContext(AlertContext);

    const handleSubmit = async (event) => {
      try {
          event.preventDefault();
          setLoading(true);

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
          setShow(false)
          window.location.href = "/Edit";
          setAlert({ type: "success", msg: body.message });
      } catch (error) {
          console.error(error.message);
          setAlert({ type: "error", msg: error.message });
      } finally {
        setLoading(false);
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
        {loading && <Spinner />}
      </form>

    );
    
  };
  export default LoginForm;