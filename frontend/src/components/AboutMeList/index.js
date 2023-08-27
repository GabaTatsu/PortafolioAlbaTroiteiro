import "./style.css";
import AboutMe from "../AboutMe";
import logoTroiteiro from "../../assets/icons/logotroiteiro.jpg";

const AboutMeList = ({ aboutMes }) => {
    return (
      <ul className="aboutme">
        <img
        src={logoTroiteiro}
        alt="Casa Troiteiro"
        ></img>
        {aboutMes.map((aboutMe) => {
          return (
            <li key={aboutMe.id}>
              <AboutMe aboutMe={aboutMe}/>
            </li>
          );
        })}
      </ul>
    );
  };
  
  export default AboutMeList;