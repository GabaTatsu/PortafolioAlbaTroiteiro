import UserData from "../../components/UserData"
import { useTokenContext } from "../../components/Contexts/TokenContext";
import EditUserForm from "../../components/EditUserForm";
import useUser from "../../hooks/UseUser";
import "./style.css";

const Edit = () => {
    const { loggedUser } = useTokenContext();
    const { user, setUser} = useUser();

    return (
        <>
        {loggedUser && (
            <div className="usuario">
                <UserData user={user}></UserData>
                <EditUserForm user={user} setUser={setUser}></EditUserForm>
            </div>                
            )}
            {!loggedUser && (
        <p>INICIA SESIÓN PARA ACCEDER A ESTA SECCIÓN</p>
            )}
        </>
    );
  };
  export default Edit;