import { useEffect, useState } from "react";

const useAboutMe = () => {
  const [aboutMes, setAboutMes] = useState([]);
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutMe = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/aboutme`,
        );

        const body = await res.json();

        setAboutMes(body.data.aboutMe);
        setContact(body.data.contact[0])
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

  return { aboutMes, contact, loading };
};
export default useAboutMe;
