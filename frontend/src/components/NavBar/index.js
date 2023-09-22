import { useEffect, useState } from "react";
import instagramIcon from "../../assets/icons/icoinstagram.png";
import arrowIcon from "../../assets/icons/down-arrow.png";
import { Link, useLocation } from "react-router-dom";
import CurvedText from "../CurvedText";


const NavBar = () => {
  const location = useLocation();
  const [ redirect, setRedirect ] = useState("/");
  const [ invert, setInvert ] = useState("NO")

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
          {redirect === "/" && (
                      <Link to="/" >
                      <CurvedText text="TRABAJOS" invert={invert}></CurvedText>
                    </Link>
          )}
          {redirect !== "/" && (
                      <Link to="/" >
                      TRABAJOS
                    </Link>
          )}

        </div>
        <div>
          {redirect === "/Portraits" && (
            <img src={arrowIcon} alt="RETRATOS"></img>
          )}
          {redirect === "/Portraits" && (
                      <Link to="/Portraits" >
                      <CurvedText text="RETRATOS" invert={invert}></CurvedText>
                    </Link>
          )}
          {redirect !== "/Portraits" && (
                      <Link to="/Portraits" >
                      RETRATOS
                    </Link>
          )}
        </div>
        <div>
          {redirect === "/Drawings" && (
            <img src={arrowIcon} alt="DIBUJOS"></img>
          )}
            {redirect === "/Drawings" && (
                      <Link to="/Drawings" >
                      <CurvedText text="DIBUJOS" invert={invert}></CurvedText>
                    </Link>
          )}
          {redirect !== "/Drawings" && (
                      <Link to="/Drawings" >
                      DIBUJOS
                    </Link>
          )}
        </div>
        <div>
          {redirect === "/AboutMe" && (
            <img src={arrowIcon} alt="SOBRE MI"></img>
          )}
                      {redirect === "/AboutMe" && (
                      <Link to="/AboutMe" >
                      <CurvedText text="SOBRE MI" invert={invert}></CurvedText>
                    </Link>
          )}
          {redirect !== "/AboutMe" && (
                      <Link to="/AboutMe" >
                      SOBRE MI
                    </Link>
          )}
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
