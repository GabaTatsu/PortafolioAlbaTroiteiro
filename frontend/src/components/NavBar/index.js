import { useEffect, useState } from "react";
import instagramIcon from "../../assets/icons/icoinstagram.png";
import arrowIcon from "../../assets/icons/down-arrow.png";
import { Link, useLocation } from "react-router-dom";


const NavBar = () => {
  const location = useLocation();
  const [ redirect, setRedirect ] = useState("/");

  useEffect(() => {
    if (location.pathname === "/Portraits" || location.pathname === "/AboutMe" || location.pathname === "/Drawings" || location.pathname === "/Edit") {
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
          {redirect === "/Drawings" && (
            <img src={arrowIcon} alt="DIBUJOS"></img>
          )}
          <Link to="/Drawings" >
            DIBUJOS
          </Link>
        </div>
        <div>
          {redirect === "/AboutMe" && (
            <img src={arrowIcon} alt="SOBRE MI/CONTACTO"></img>
          )}
          <Link to="/AboutMe" >
            <p>SOBRE MI</p>
            <p>CONTACTO</p>
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
