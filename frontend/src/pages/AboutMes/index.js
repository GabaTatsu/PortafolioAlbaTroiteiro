import AboutMeList from "../../components/AboutMeList";
import Contact from "../../components/Contact";
import useAboutMe from "../../hooks/useAboutMe";

const AboutMes = () => {  
  const { aboutMes, contact } = useAboutMe();

  return (
    <>
      <AboutMeList aboutMes={aboutMes}/>
      <Contact contact={contact}></Contact>
    </>
  );
  };
  
  export default AboutMes;
  