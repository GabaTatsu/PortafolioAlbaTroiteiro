import WorksList from "../../components/WorksList";
import usePortraits from "../../hooks/usePortraits";

const Works = () => {
  const { works } = usePortraits();

  return <WorksList works={works}></WorksList>;
};

export default Works;
