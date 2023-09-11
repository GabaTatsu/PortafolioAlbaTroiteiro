import { useState } from "react";
import { useTokenContext } from "../Contexts/TokenContext";

const AlertDeleteAboutMe = ({id, deleteAboutMe}) =>{
    const [alertDeleteAboutMe, setAlertDeleteAboutMe] = useState(false);
    const { token } = useTokenContext();

  return (
    <>
      {alertDeleteAboutMe === false && (
        <button
          onClick={() => {
            setAlertDeleteAboutMe(true);
          }}
        >
          Borrar
        </button>
      )}
      {alertDeleteAboutMe === true && (

          <article className="alertdelete">
              <p>¿Seguro que quieres borrar el registro?</p>
              <aside>
                <button
                  onClick={async (event) => {
                    try {
                      event.preventDefault();
                      const res = await fetch(
                        `${process.env.REACT_APP_API_URL}/aboutme/delete/${id}`,
                        {
                          method: "DELETE",
                          headers: {
                            Authorization: token,
                          },
                        }
                      );
                      const body = await res.json();

                      if (!res.ok) {
                        throw new Error(body.message);
                      }
                      deleteAboutMe(id);
                      setAlertDeleteAboutMe(false);
                    } catch (error) {
                      console.error(error.message);
                    } finally {
                    }
                  }}
                >
                  Borrar
                </button>
                <button
                  onClick={() => {
                    setAlertDeleteAboutMe(false);
                  }}
                >
                  Cancelar
                </button>
              </aside>
          </article>
      )}
    </>
  );
};

export default AlertDeleteAboutMe;