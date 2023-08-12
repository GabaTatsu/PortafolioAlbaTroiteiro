import WorksList from "../../components/WorksList";
import usePortraits from "../../hooks/usePortraits";


const Works = () => {
  const { portraits, deletePortrait } = usePortraits();

  return <WorksList works={portraits} deleteWork={deletePortrait}></WorksList>;
};

export default Works;
