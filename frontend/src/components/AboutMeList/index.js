import AboutMe from "../AboutMe";
import "./style.css";

const AboutMeList = ({ aboutMes, deleteAboutMe }) => {

    return (
      <ul className="aboutme">        
        {aboutMes.map((aboutMe) => {
          return (
            <li key={aboutMe.id}>
              <AboutMe aboutMe={aboutMe} deleteAboutMe={deleteAboutMe}/>
            </li>
          );
        })}
      </ul>
    );
  };
  
  export default AboutMeList;