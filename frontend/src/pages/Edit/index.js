import UserData from "../../components/UserData"
import { useTokenContext } from "../../components/Contexts/TokenContext";
import EditUserForm from "../../components/EditUserForm";
import useUser from "../../hooks/UseUser";
import EditWork from "../../components/EditWork";
import EditPortrait from "../../components/EditPortrait";
import { useState } from "react";

const Edit = () => {
    const { loggedUser } = useTokenContext();
    const { user, setUser} = useUser();
    const [changeWorks, setChangeWorks] = useState("RETRATOS");

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
            </>
            )}
            {!loggedUser && (
        <p>INICIA SESIÓN PARA ACCEDER A ESTA SECCIÓN</p>
            )}
        </>
    );
  };
  export default Edit;