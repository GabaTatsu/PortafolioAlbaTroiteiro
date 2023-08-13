import { useTokenContext } from "../Contexts/TokenContext";
import logoutIcon from "../../assets/icons/logout.png";

const Logout = () => {
  const { setToken, setLoggedUser } = useTokenContext();

  return (    
      <button
        onClick={() => {
          setToken("");
          setLoggedUser("");
        }}
      >
        <img src={logoutIcon} alt="Cerrar sesión"></img>
      </button>
  );
};

export default Logout;