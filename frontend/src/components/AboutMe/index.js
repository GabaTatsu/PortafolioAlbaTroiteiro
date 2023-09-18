import AlertDeleteAboutMe from "../AlertDeleteAboutMe";
import { useTokenContext } from "../Contexts/TokenContext";
import EditAboutMeForm from "../EditAboutMeForm";
import { useState } from "react";

const AboutMe = ({aboutMe, deleteAboutMe}) => {
  const { loggedUser } = useTokenContext();
  const { descriptionaboutme } = aboutMe;
  const [descriptionAboutMe, setDescriptionAboutMe] = useState(descriptionaboutme);   

    return(
      <>
       <article>  
        {loggedUser && (
          <>
          <EditAboutMeForm setDescriptionAboutMe={setDescriptionAboutMe} id={aboutMe.id} ></EditAboutMeForm>
        <AlertDeleteAboutMe id={aboutMe.id} deleteAboutMe={deleteAboutMe}></AlertDeleteAboutMe>
        </>
        )}
       </article>
       <p dangerouslySetInnerHTML={{ __html: descriptionAboutMe }}></p>
       </>
    )
}

export default AboutMe;