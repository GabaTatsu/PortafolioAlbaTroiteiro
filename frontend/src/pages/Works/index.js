
import WorksList from "../../components/WorksList";
import useWorks from "../../hooks/useWorks";

const Works = () => {
  const { works } = useWorks();

  return (
    <>
  <WorksList works={works}></WorksList>
  
  </>
  );
};

export default Works;
