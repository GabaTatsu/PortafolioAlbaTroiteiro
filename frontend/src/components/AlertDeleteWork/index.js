import "./style.css";
import { useState } from "react";
import { useTokenContext } from "../Contexts/TokenContext";

const AlertDeleteWork = ({id, title, deleteWork}) =>{
    const [alertDeleteLink, setAlertDeleteLink] = useState(false);
    const { token } = useTokenContext();

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
                    setAlertDeleteLink(false);
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

export default AlertDeleteWork;