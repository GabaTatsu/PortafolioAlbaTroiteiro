import AboutMeList from "../../components/AboutMeList";
import Contact from "../../components/Contact";
import useAboutMe from "../../hooks/useAboutMe";
import useUser from "../../hooks/UseUser";
import Imagen from "../../components/Imagen";
import logoTroiteiro from "../../assets/icons/logotroiteiro.jpg";

const AboutMes = () => {  
  const { aboutMes, deleteAboutMe } = useAboutMe();
  const { user } = useUser();

  return (
    <>
    <img
        src={logoTroiteiro}
        alt="Casa Troiteiro"
        ></img>
        <div>
        <aside>
        <Imagen image={user.userimage} title={user.username}></Imagen>
        <Contact></Contact>
        </aside>      
        <AboutMeList aboutMes={aboutMes} deleteAboutMe={deleteAboutMe}/>
        </div>
       

    </>
  );
  };
  
  export default AboutMes;
  