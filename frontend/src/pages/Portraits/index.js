import WorksList from "../../components/WorksList";
import usePortraits from "../../hooks/usePortraits";


const Works = () => {
  const { portraits, deletePortrait, setPortraits } = usePortraits();

  return <WorksList works={portraits} setPortraits={setPortraits} deleteWork={deletePortrait}></WorksList>;
};

export default Works;
