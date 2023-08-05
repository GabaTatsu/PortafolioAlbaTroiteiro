import { useState } from "react";
import editIcon from "../../assets/icons/editar.png";
import LoginForm from "../LoginForm";

const Footer = () => {
  const [show, setShow] = useState(false);

    return (

     <footer>
        <p>Pie de página</p>
        {show && (
        <LoginForm></LoginForm>
      )}
        <button
        type="button"
        onClick={() => {
          setShow(!show)
        }}
        ><img src={editIcon} alt="EDITAR"></img></button>
     </footer>

    );
  };
  export default Footer;