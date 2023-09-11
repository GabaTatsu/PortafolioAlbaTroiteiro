import { useEffect, useState } from "react";

const useAboutMe = () => {
  const [aboutMes, setAboutMes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutMe = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/aboutme`,
        );

        const body = await res.json();

        setAboutMes(body.data.aboutMe);
        if (!res.ok) {
          throw new Error(body.message);
        }
      } catch (error) {
        console.error(error.message);
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
