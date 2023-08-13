import "./style.css";
import Work from "../Work";

const WorksList = ({ works, deleteWork, setWorks, setPortraits }) => {
  return (
    <ul>
      {works.map((work) => {
        return (
          <li key={work.id}>
            <Work work={work} deleteWork={deleteWork} setWorks={setWorks} setPortraits={setPortraits} />
          </li>
        );
      })}
    </ul>
  );
};

export default WorksList;
