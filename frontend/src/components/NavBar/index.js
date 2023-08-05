import { Link } from "react-router-dom";
import instagramIcon from "../../assets/icons/icoinstagram.png";

const NavBar = () => {
  return (
    <>
    <aside>
    <Link to="/">TRABAJOS</Link>
  <Link to="/Portraits">RETRATOS</Link>
  <Link to="/AboutMe">SOBRE MI</Link>
  <Link to="/Contact">CONTACTO</Link>
  <div>
  <img src={instagramIcon} alt="INSTAGRAM"></img>
  </div>
  
    </aside>
  
  </>
  );
};
export default NavBar;
