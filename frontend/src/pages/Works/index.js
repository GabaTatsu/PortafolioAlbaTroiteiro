import WorksList from "../../components/WorksList";
import useWorks from "../../hooks/useWorks";

const Works = () => {
  const { works, deleteWork } = useWorks();

  return (
    <>
  <WorksList works={works} deleteWork={deleteWork}></WorksList>
  
  </>
  );
};

export default Works;
