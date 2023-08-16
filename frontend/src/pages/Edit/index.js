import WorksList from "../../components/WorksList";
import UserData from "../../components/UserData"
import { useTokenContext } from "../../components/Contexts/TokenContext";
import useWorks from "../../hooks/useWorks";
import EditUserForm from "../../components/EditUserForm";
import useUser from "../../hooks/UseUser";
import EditWork from "../../components/EditWork";
import EditPortrait from "../../components/EditPortrait";

const Edit = () => {
    const { loggedUser } = useTokenContext();
    const { user, setUser} = useUser();

    return (
        <>
        {loggedUser && (
            <>
                <UserData user={user}></UserData>
                <EditUserForm user={user} setUser={setUser}></EditUserForm>
                <div>
                <EditWork></EditWork>
                <EditPortrait></EditPortrait>
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