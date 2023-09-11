import UserData from "../../components/UserData"
import { useTokenContext } from "../../components/Contexts/TokenContext";
import EditUserForm from "../../components/EditUserForm";
import useUser from "../../hooks/UseUser";
import EditWork from "../../components/EditWork";
import EditPortrait from "../../components/EditPortrait";
import { useState } from "react";
import useAboutMe from "../../hooks/useAboutMe";
import AboutMeList from "../../components/AboutMeList";
import Contact from "../../components/Contact";
import NewAboutMeForm from "../../components/NewAboutMeForm";

const Edit = () => {
    const { loggedUser } = useTokenContext();
    const { user, setUser} = useUser();
    const [changeWorks, setChangeWorks] = useState("RETRATOS");
    const { aboutMes, deleteAboutMe, adAboutMe } = useAboutMe();

    return (
        <>
        {loggedUser && (
            <>
                <UserData user={user}></UserData>
                <EditUserForm user={user} setUser={setUser}></EditUserForm>
                <div>
                    <button
                    onClick={()=>{
                        if(changeWorks === "RETRATOS"){
                            setChangeWorks("TRABAJOS")
                        } else {
                            setChangeWorks("RETRATOS")
                        }
                        }
                    }
                    >{changeWorks}</button>
                    {changeWorks === "RETRATOS" && <EditWork></EditWork>}
                    {changeWorks === "TRABAJOS" && <EditPortrait></EditPortrait>}                
                </div>
                <h3>SOBRE MI</h3>
                <NewAboutMeForm adAboutMe={adAboutMe}></NewAboutMeForm>
                <AboutMeList aboutMes={aboutMes} deleteAboutMe={deleteAboutMe}/>
                <Contact></Contact>
            </>
            )}
            {!loggedUser && (
        <p>INICIA SESIÓN PARA ACCEDER A ESTA SECCIÓN</p>
            )}
        </>
    );
  };
  export default Edit;