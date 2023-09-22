import { useState, useContext } from "react";
import { useTokenContext } from "../Contexts/TokenContext";
import { AlertContext } from "../Contexts/AlertContext";
import Spinner from "../Spinner";

const AlertDeleteWork = ({id, title, deleteWork}) =>{
    const [alertDeleteLink, setAlertDeleteLink] = useState(false);
    const { token } = useTokenContext();
    const { setAlert } = useContext(AlertContext);
    const [loading, setLoading] = useState(false);

  return (
    <>
      {alertDeleteLink === false && (
        <button
          onClick={() => {
            setAlertDeleteLink(true);
          }}
        >
          Borrar
        </button>
      )}
      {alertDeleteLink === true && (

          <article className="alertdelete">
              <p>¿Seguro que quieres borrar el enlace con título: {title}?</p>
              <aside>
                <button
                  onClick={async (event) => {
                    try {
                      event.preventDefault();
                      setLoading(true);

                      const res = await fetch(
                        `${process.env.REACT_APP_API_URL}/works/delete/${id}`,
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
                      deleteWork(id);
                      setAlertDeleteLink(false);
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
                    setAlertDeleteLink(false);
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

export default AlertDeleteWork;