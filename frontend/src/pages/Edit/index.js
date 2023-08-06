import WorksList from "../../components/WorksList";
import useAll from "../../hooks/useAll";
import UserData from "../../components/UserData"
import { useTokenContext } from "../../components/Contexts/TokenContext";

const Edit = () => {
    const { works } = useAll();
    const { loggedUser } = useTokenContext();
    return (
        
        <>
        {loggedUser && (
            <>
                <UserData></UserData>
                <WorksList works={works}></WorksList>
                </>
            )}
            {!loggedUser && (
<p>INICIA SESIÓN PARA ACCEDER A ESTA SECCIÓN</p>
            )}
        
        </>
    );
  };
  export default Edit;