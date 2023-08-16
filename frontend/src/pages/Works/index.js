import WorksList from "../../components/WorksList";
import useWorks from "../../hooks/useWorks";

const Works = () => {
  const { works, deleteWork } = useWorks({workType: "1"});

  return (
    <>
      <WorksList works={works} deleteWork={deleteWork} />
    </>
  );
};

export default Works;