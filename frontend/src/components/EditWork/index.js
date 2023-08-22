import WorksList from "../../components/WorksList";
import useWorks from "../../hooks/useWorks";
import NewWorkForm from "../NewWorkForm";

const EditWork = () => {
  const { works, deleteWork, reorder, adWork } = useWorks({workType: "1"});

  return (
    <>
    <h4>TRABAJOS</h4>
    <NewWorkForm adWork={adWork}></NewWorkForm>
    <WorksList works={works} deleteWork={deleteWork} reorder={reorder}></WorksList>
    </>
  );
};

export default EditWork;