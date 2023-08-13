import { useEffect, useState } from "react";

const usePortraits = () => {
  const [portraits, setPortraits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/portraits`,
        );

        const body = await res.json();

        setPortraits(body.data);
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
  }, []);

  const deletePortrait = (id) => {
    const indexToDelete = portraits.findIndex((portrait) => {
      return portrait.id === id;
    });
    portraits.splice(indexToDelete, 1);
    setPortraits([...portraits]);
  };

  return { portraits, setPortraits, loading, deletePortrait };
};
export default usePortraits;
