import { useEffect, useState, useContext } from "react";
import { AlertContext } from "../components/Contexts/AlertContext";

const useWorks = ({workType}) => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/works?category=${workType}`,
        );

        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.message);
        }

        setWorks(body.data);
        setAlert({ type: "success", msg: body.message });

      } catch (error) {
        console.error(error.message);
        setAlert({ type: "error", msg: error.message });
        
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, [workType]);

  const deleteWork = (id) => {
    const deletedItem = works.find((item) => item.id === id);

    if (deletedItem) {
      const deletedOrderer = deletedItem.orderer;

      const updatedArray = works.filter((item) => item.id !== id);

      const finalUpdatedArray = updatedArray.map((item) => ({
        ...item,
        orderer: item.orderer > deletedOrderer ? item.orderer - 1 : item.orderer,
      }));

      setWorks(finalUpdatedArray);
    }
  };  

  const reorder = ({id, direction}) => {
    const updatedArrays = [...works];

    const targetIndex = updatedArrays.findIndex((obj) => obj.id === id);
    if (targetIndex === -1) {
      return;
    }
  
    const targetObject = updatedArrays[targetIndex];
    const targetOrderer = targetObject.orderer;
  
    if (direction === 0 && targetOrderer > 1) {
      targetObject.orderer--;
  
      const previousIndex = targetIndex - 1;
      if (previousIndex >= 0) {
        updatedArrays[previousIndex].orderer++;
      }
    }
    
    if (direction === 1 && targetOrderer < updatedArrays.length) {
      targetObject.orderer++;
  
      const nextIndex = targetIndex + 1;
      if (nextIndex < updatedArrays.length) {
        updatedArrays[nextIndex].orderer--;
      }
    }
  
    updatedArrays.sort((a, b) => a.orderer - b.orderer);
  
      setWorks(updatedArrays);
  }; 

  const adWork = ({ newObject }) => {
    const maxOrderer = Math.max(...works.map(item => item.orderer), 0);
  
    const updatedObject = {
      ...newObject,
      orderer: maxOrderer + 1,
      createdAt: new Date().toISOString(),
    };
  
    const newUpdatedWorks = [...works, updatedObject];
    setWorks(newUpdatedWorks);
  };


  return { works, loading, setLoading, deleteWork, reorder, adWork};
};
export default useWorks;
