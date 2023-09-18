import WorksList from "../../components/WorksList";
import useWorks from "../../hooks/useWorks";
import NewWorkForm from "../../components/NewWorkForm";
import Spinner from "../../components/Spinner";


const Works = () => {
  const { works, deleteWork, reorder, adWork, loading, setLoading } = useWorks({workType: "0"});

  return (
    <>
  {loading && <Spinner />}
  <NewWorkForm works={works} adWork={adWork}></NewWorkForm>
  <WorksList works={works} deleteWork={deleteWork} reorder={reorder} setLoading={setLoading}></WorksList>
  </>
  );
};

export default Works;
