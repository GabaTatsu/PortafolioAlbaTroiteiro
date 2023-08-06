import { useContext } from "react";
import { NavigationContext } from "../Contexts/NavigationContext";
import instagramIcon from "../../assets/icons/icoinstagram.png";
import { Navigate } from "react-router-dom";

const NavBar = () => {
  const { redirectTo, setRedirectTo } = useContext(NavigationContext);
  return (
    <>
    {redirectTo && <Navigate to={redirectTo} />}
    <aside>
      <button
      onClick={() => {
        setRedirectTo("/");
      }}
      >TRABAJOS</button>
      <button
      onClick={() => {
        setRedirectTo("/Portraits");
      }}
      >RETRATOS</button>
      <button
      onClick={() => {
        setRedirectTo("/AboutMe");
      }}
      >SOBRE MI</button>
      <button
      onClick={() => {
        setRedirectTo("/Contact");
      }}
      >CONTACTO</button>
  <div>
  <img src={instagramIcon} alt="INSTAGRAM"></img>
  </div>
  
    </aside>
  
  </>
  );
};
export default NavBar;
