import "./style.css";
import flechas from "../../assets/icons/down-arrow.png";
import { useTokenContext } from "../Contexts/TokenContext";

const ChangeOrder = ({id, reorder})=>{
    const { token } = useTokenContext();

    const sendOrderDirection = async (ordererDirection) => {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/works/order/${id}`,
            {
              method: "PUT",
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ordererDirection }),
            }
          );
    
          const body = await res.json();
          if (!res.ok) {
            throw new Error(body.message);
          }
        } catch (error) {
          console.error(error.message);
        }
      };    

    return (
        <div className="orderArrows">
            <button 
            onClick={() => {
            sendOrderDirection(0);
            reorder({id, direction: 0});
          }}
          ><img src={flechas} alt="Subir"></img></button>
            <button
            onClick={() => {
                sendOrderDirection(1);
                reorder({id, direction: 1});
              }}
            ><img src={flechas} alt="Bajar"></img></button>
        </div>
    )
}
export default ChangeOrder;