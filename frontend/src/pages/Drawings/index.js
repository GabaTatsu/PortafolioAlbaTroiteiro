import WorksList from "../../components/WorksList";
import useWorks from "../../hooks/useWorks";
import NewWorkForm from "../../components/NewWorkForm";

const Drawings = () => {
  const { works, deleteWork, reorder, adWork } = useWorks({workType: "2"});

  return (
    <>
    <NewWorkForm works={works} adWork={adWork}></NewWorkForm>
      <WorksList works={works} deleteWork={deleteWork} reorder={reorder}/>
    </>
  );
};

export default Drawings;