import { useContext } from "react";
import { NavigationContext } from "../Contexts/NavigationContext";
import instagramIcon from "../../assets/icons/icoinstagram.png";
import { Navigate } from "react-router-dom";
import arrowIcon from "../../assets/icons/down-arrow.png";

const NavBar = () => {
  const { redirectTo, setRedirectTo } = useContext(NavigationContext);
  return (
    <>
    {redirectTo && <Navigate to={redirectTo} />}
    <aside>
      <div>
        { redirectTo === "/" && (
          <img src={arrowIcon} alt="TRABAJOS"></img>
        )}
      <button
      onClick={() => {
        setRedirectTo("/");
      }}
      >TRABAJOS</button>
      </div>
      <div>
      { redirectTo === "/Portraits" && (
      <img src={arrowIcon} alt="RETRATOS"></img>
      )}
      <button
      onClick={() => {
        setRedirectTo("/Portraits");
      }}
      >RETRATOS</button>
      </div>
      <div>
      { redirectTo === "/AboutMe" && (
      <img src={arrowIcon} alt="SOBRE MI"></img>
      )}
      <button
      onClick={() => {
        setRedirectTo("/AboutMe");
      }}
      >SOBRE MI</button>
      </div>
      <div>
      { redirectTo === "/Contact" && (
      <img src={arrowIcon} alt="CONTACTO"></img>
      )}
      <button
      onClick={() => {
        setRedirectTo("/Contact");
      }}
      >CONTACTO</button>
      </div>
      
  <div>
  <img src={instagramIcon} alt="INSTAGRAM"></img>
  </div>
  </aside>
  </>
  );
};
export default NavBar;
