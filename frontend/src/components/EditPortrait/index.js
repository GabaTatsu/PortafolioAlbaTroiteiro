import WorksList from "../../components/WorksList";
import useWorks from "../../hooks/useWorks";


const EditPortrait = () => {
  const { works, deleteWork, reorder } = useWorks({workType: "0"});

  return (
    <>
    <h4>RETRATOS</h4>
    <WorksList works={works} deleteWork={deleteWork} reorder={reorder}></WorksList>
    </>
  );
};

export default EditPortrait;