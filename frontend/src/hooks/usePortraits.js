import { useEffect, useState } from "react";

const useWorks = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/Portraits`);

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
  return { works, loading };
};
export default useWorks;
