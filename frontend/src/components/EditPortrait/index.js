import WorksList from "../../components/WorksList";
import useWorks from "../../hooks/useWorks";
import NewWorkForm from "../NewWorkForm";

const EditPortrait = () => {
  const { works, deleteWork, reorder, adWork } = useWorks({workType: "0"});

  return (
    <>
    <h4>RETRATOS</h4>
    <NewWorkForm adWork={adWork}></NewWorkForm>
    <WorksList works={works} deleteWork={deleteWork} reorder={reorder}></WorksList>
    </>
  );
};

export default EditPortrait;