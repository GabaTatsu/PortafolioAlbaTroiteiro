import { useEffect, useState } from "react";

const useWorks = ({workType}) => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/works?category=${workType}`,
        );

        const body = await res.json();

        setWorks(body.data);
        if (!res.ok) {
          throw new Error(body.message);
        }
      } catch (error) {
        console.error(error.message);
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

  return { works, loading, deleteWork};
};
export default useWorks;
