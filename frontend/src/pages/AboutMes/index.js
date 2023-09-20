import AboutMeList from "../../components/AboutMeList";
import Contact from "../../components/Contact";
import useAboutMe from "../../hooks/useAboutMe";
import useUser from "../../hooks/UseUser";
import Imagen from "../../components/Imagen";
import logoTroiteiro from "../../assets/icons/logotroiteiro.jpg";
import Spinner from "../../components/Spinner";
import NewAboutMeForm from "../../components/NewAboutMeForm";

const AboutMes = () => {  
  const { aboutMes, deleteAboutMe, adAboutMe, loading } = useAboutMe();
  const { user } = useUser();

  return (
    <>
    <NewAboutMeForm adAboutMe={adAboutMe}></NewAboutMeForm>
    {loading && <Spinner />}
    <img
        src={logoTroiteiro}
        alt="Casa Troiteiro"
        ></img>
        <div>
        <aside>
          {user.userimage &&
                  <Imagen image={user.userimage} title={user.username}></Imagen>
          }
        <Contact></Contact>
        </aside>      
        <AboutMeList aboutMes={aboutMes} deleteAboutMe={deleteAboutMe}/>
        </div>
    </>
  );
  };
  
  export default AboutMes;
  