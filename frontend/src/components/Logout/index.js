import { useTokenContext } from "../Contexts/TokenContext";
import logoutIcon from "../../assets/icons/logout.png";

const Logout = ({setRedirect}) => {
  const { setToken, setLoggedUser } = useTokenContext();

  return (    
      <button
        onClick={() => {
          setToken("");
          setLoggedUser("");
          setRedirect("/")
        }}
      >
        <img src={logoutIcon} alt="Cerrar sesión"></img>
      </button>
  );
};

export default Logout;