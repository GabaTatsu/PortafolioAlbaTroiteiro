import { useState } from "react";
import editIcon from "../../assets/icons/editar.png";
import LoginForm from "../LoginForm";
import { useTokenContext } from "../Contexts/TokenContext";
import { useContext } from "react";
import { NavigationContext } from "../Contexts/NavigationContext";

const Footer = () => {
  const [show, setShow] = useState(false);
  const { loggedUser } = useTokenContext();
  const { setRedirectTo } = useContext(NavigationContext);

    return (
     <footer>
        <p>Pie de página</p>
        {!loggedUser && show && (
        <LoginForm
        setShow={setShow}
        ></LoginForm>
      )}
      
        <button
        type="button"
        onClick={() => {
          if (loggedUser) {
            setRedirectTo("/Edit");
        }
          setShow(!show)
        }}
        ><img src={editIcon} alt="EDITAR"></img></button>
       
     </footer>
    );
  };
  export default Footer;