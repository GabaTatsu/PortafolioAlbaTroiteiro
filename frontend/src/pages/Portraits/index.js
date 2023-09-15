import WorksList from "../../components/WorksList";
import useWorks from "../../hooks/useWorks";
import NewWorkForm from "../../components/NewWorkForm";


const Works = () => {
  const { works, deleteWork, reorder, adWork } = useWorks({workType: "0"});

  return (
    <>
  <NewWorkForm works={works} adWork={adWork}></NewWorkForm>
  <WorksList works={works} deleteWork={deleteWork} reorder={reorder}></WorksList>
  </>
  );
};

export default Works;
