import NavBar from "../NavBar";
import "./style.css";

const Header = ({redirect, setRedirect}) => {
  return (
    <>
      <header >      
        <NavBar redirect={redirect} setRedirect={setRedirect}></NavBar>
      </header>
    </>
  );
};
export default Header;
