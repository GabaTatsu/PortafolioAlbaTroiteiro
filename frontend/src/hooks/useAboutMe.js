import { useEffect, useState, useContext } from "react";
import { AlertContext } from "../components/Contexts/AlertContext";

const useAboutMe = () => {
  const [aboutMes, setAboutMes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    const fetchAboutMe = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/aboutme`,
        );

        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.message);
        }

        setAboutMes(body.data.aboutMe);
        setAlert({ type: "success", msg: body.message });

      } catch (error) {
        console.error(error.message);
        setAlert({ type: "error", msg: error.message });
        
      } finally {
        setLoading(false);
      }
    };
    fetchAboutMe();
  }, []);

  const deleteAboutMe = (id) => {
    const indexToDelete = aboutMes.findIndex((aboutMe) => {
      return aboutMe.id === id;
    });
    aboutMes.splice(indexToDelete, 1);
    setAboutMes([...aboutMes]);
  };
  const adAboutMe = ({ newObject }) => {
    setAboutMes([...aboutMes, newObject]);
  };


  return { aboutMes, deleteAboutMe, adAboutMe, loading };
};
export default useAboutMe;
