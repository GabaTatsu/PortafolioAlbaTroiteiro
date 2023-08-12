import { useEffect } from "react";
import instagramIcon from "../../assets/icons/icoinstagram.png";
import arrowIcon from "../../assets/icons/down-arrow.png";
import { Link, useLocation } from "react-router-dom";


const NavBar = ({redirect, setRedirect}) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/Portraits" || location.pathname === "/AboutMe" || location.pathname === "/Contact" || location.pathname === "/Edit") {
      setRedirect(location.pathname);
    } else {
      setRedirect("/");
    }
  }, [location.pathname]);

  return (
    <>
      <aside>
        <div>
          {redirect === "/" && (
            <img src={arrowIcon} alt="TRABAJOS"></img>
          )}
          <Link to="/" >
            TRABAJOS
          </Link>
        </div>
        <div>
          {redirect === "/Portraits" && (
            <img src={arrowIcon} alt="RETRATOS"></img>
          )}
          <Link to="/Portraits" >
            RETRATOS
          </Link>
        </div>
        <div>
          {redirect === "/AboutMe" && (
            <img src={arrowIcon} alt="SOBRE MI"></img>
          )}
          <Link to="/AboutMe" >
            SOBRE MI
          </Link>
        </div>
        <div>
          {redirect === "/Contact" && (
            <img src={arrowIcon} alt="CONTACTO"></img>
          )}
          <Link to="/Contact" >
            CONTACTO
          </Link>
        </div>

        <div>
          <a
            href="https://www.instagram.com/alba_troiteiro/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={instagramIcon} alt="INSTAGRAM"></img>
          </a>
        </div>
      </aside>
    </>
  );
};
export default NavBar;
