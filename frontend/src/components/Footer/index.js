import { useState } from "react";
import editIcon from "../../assets/icons/editar.png";
import LoginForm from "../LoginForm";
import { useTokenContext } from "../Contexts/TokenContext";
import Logout from "../Logout";
import { Link } from "react-router-dom";

const Footer = ({setRedirect}) => {
  const [show, setShow] = useState(false);
  const { loggedUser } = useTokenContext();

    return (
      <footer>
      <p>Pie de página</p>
      {!loggedUser && show && <LoginForm setShow={setShow}></LoginForm>}
      <div>
        {loggedUser ? (
          <Link to="/Edit">
            <img src={editIcon} alt="EDITAR"></img>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              setShow(!show);
            }}
          >
            <img src={editIcon} alt="EDITAR"></img>
          </button>
        )}
        {loggedUser && <Logout setRedirect={setRedirect}></Logout>}
      </div>
    </footer>
    );
  };
  export default Footer;