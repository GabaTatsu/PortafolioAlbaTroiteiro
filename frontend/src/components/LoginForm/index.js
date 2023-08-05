import { useState } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
      <form
      onSubmit={async (event) => {
        try {
          event.preventDefault();

          const res = await fetch(`${process.env.REACT_APP_API_URL}/loginUser`, {
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
        } catch (error) {
          console.error(error.message);
        } finally {
        }
      }}
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