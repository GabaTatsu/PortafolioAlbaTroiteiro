import { useState, useContext } from "react";
import { useTokenContext } from "../Contexts/TokenContext";
import { AlertContext } from "../Contexts/AlertContext";
import Spinner from "../Spinner";

const AlertDeleteAboutMe = ({id, deleteAboutMe}) =>{
    const [alertDeleteAboutMe, setAlertDeleteAboutMe] = useState(false);
    const { token } = useTokenContext();
    const { setAlert } = useContext(AlertContext);
    const [loading, setLoading] = useState(false);

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
                      setLoading(true);

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
                      setAlert({ type: "success", msg: body.message });

                    } catch (error) {
                      console.error(error.message);
                      setAlert({ type: "error", msg: error.message });
                    } finally {
                      setLoading(false);
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
              {loading && <Spinner />}
          </article>
      )}
    </>
  );
};

export default AlertDeleteAboutMe;