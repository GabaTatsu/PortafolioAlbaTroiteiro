import useUser from "../../hooks/UseUser";

const Edit = () => {
    const { user, setUser } = useUser();
    const { username } = user;

    return (        
        <article>           
            <h3>Hola! {username}</h3>
            <div></div>
        </article>
    );
  };
  export default Edit;