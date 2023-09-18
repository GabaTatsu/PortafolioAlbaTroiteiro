import { useState, useEffect, useContext } from "react";
import { AlertContext } from "../components/Contexts/AlertContext";

const useUser = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { setAlert } = useContext(AlertContext);

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
        setAlert({ type: "success", msg: body.message });

      } catch (error) {
        console.error(error.message);
        setAlert({ type: "error", msg: error.message });
        
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  return { user, setUser, loading};
};
export default useUser;