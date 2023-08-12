import { useEffect, useState } from "react";

const useWorks = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/works`,
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
  }, []);

  const deleteWork = (id) => {
    const indexToDelete = works.findIndex((work) => {
      return work.id === id;
    });
    works.splice(indexToDelete, 1);
    setWorks([...works]);
  };

  return { works, loading, deleteWork};
};
export default useWorks;
