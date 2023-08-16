import WorksList from "../../components/WorksList";
import useWorks from "../../hooks/useWorks";


const Works = () => {
  const { works, deleteWork, } = useWorks({workType: "0"});

  return <WorksList works={works} deleteWork={deleteWork}></WorksList>;
};

export default Works;
