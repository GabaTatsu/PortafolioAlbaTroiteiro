import WorksList from "../../components/WorksList";
import useWorks from "../../hooks/useWorks";


const EditWork = () => {
  const { works, deleteWork, reorder } = useWorks({workType: "1"});

  return (
    <>
    <h4>TRABAJOS</h4>
    <WorksList works={works} deleteWork={deleteWork} reorder={reorder}></WorksList>
    </>
  );
};

export default EditWork;