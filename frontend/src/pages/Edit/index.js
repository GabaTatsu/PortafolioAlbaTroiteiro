import UserData from "../../components/UserData"
import { useTokenContext } from "../../components/Contexts/TokenContext";
import EditUserForm from "../../components/EditUserForm";
import useUser from "../../hooks/UseUser";
import "./style.css";
import Spinner from "../../components/Spinner";

const Edit = () => {
    const { loggedUser } = useTokenContext();
    const { user, setUser, loading} = useUser();

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
            {loading && <Spinner />}
        </>
    );
  };
  export default Edit;