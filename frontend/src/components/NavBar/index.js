import { Link } from "react-router-dom";
import instagramIcon from "../../assets/icons/icoinstagram.png";

const NavBar = () => {
  return (
    <>
    <aside>
    <Link to="/">TRABAJOS</Link>
  <Link to="/">RETRATOS</Link>
  <Link to="/">SOBRE MI</Link>
  <Link to="/">CONTACTO</Link>
  <div>
  <img src={instagramIcon} alt="INSTAGRAM"></img>
  </div>
  
    </aside>
  
  </>
  );
};
export default NavBar;
