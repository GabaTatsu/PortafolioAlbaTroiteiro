import WorksList from "../../components/WorksList";
import useWorks from "../../hooks/useWorks";

const Drawings = () => {
  const { works, deleteWork, reorder } = useWorks({workType: "2"});

  return (
    <>
      <WorksList works={works} deleteWork={deleteWork} reorder={reorder}/>
    </>
  );
};

export default Drawings;