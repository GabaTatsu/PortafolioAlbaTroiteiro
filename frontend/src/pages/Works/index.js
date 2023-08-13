import WorksList from "../../components/WorksList";
import useWorks from "../../hooks/useWorks";

const Works = () => {
  const { works, deleteWork, setWorks } = useWorks();

  return (
    <>
  <WorksList works={works} setWorks={setWorks} deleteWork={deleteWork}></WorksList>
  
  </>
  );
};

export default Works;
