import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/user/1`
        );

        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.message);
        }

        setUser(body.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  return { user, setUser, loading};
};
export default useUser;