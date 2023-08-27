import { useState } from "react";
import editIcon from "../../assets/icons/editar.png";
import LoginForm from "../LoginForm";
import { useTokenContext } from "../Contexts/TokenContext";
import Logout from "../Logout";
import { Link } from "react-router-dom";

const Footer = () => {
  const [show, setShow] = useState(false);
  const { loggedUser } = useTokenContext();

    return (
      <footer>
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
        {loggedUser && <Logout ></Logout>}
      </div>
    </footer>
    );
  };
  export default Footer;