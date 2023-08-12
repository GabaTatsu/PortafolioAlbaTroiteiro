import WorksList from "../../components/WorksList";
import UserData from "../../components/UserData"
import { useTokenContext } from "../../components/Contexts/TokenContext";
import useWorks from "../../hooks/useWorks";
import usePortraits from "../../hooks/usePortraits";
import EditUserForm from "../../components/EditUserForm";
import useUser from "../../hooks/UseUser";

const Edit = () => {
    const { loggedUser } = useTokenContext();
    const { works, deleteWork } = useWorks();
    const { portraits, deletePortrait } = usePortraits();
    const { user, setUser} = useUser();

    return (
        <>
        {loggedUser && (
            <>
                <UserData user={user}></UserData>
                <EditUserForm user={user} setUser={setUser}></EditUserForm>
                <div>
                <h4>TRABAJOS</h4>
                <WorksList works={works} deleteWork={deleteWork}></WorksList>
                <h4>RETRATOS</h4>
                <WorksList works={portraits} deleteWork={deletePortrait}></WorksList>;
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