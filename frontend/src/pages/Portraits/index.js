import WorksList from "../../components/WorksList";
import useWorks from "../../hooks/useWorks";


const Works = () => {
  const { works, deleteWork, reorder } = useWorks({workType: "0"});

  return <WorksList works={works} deleteWork={deleteWork} reorder={reorder}></WorksList>;
};

export default Works;
