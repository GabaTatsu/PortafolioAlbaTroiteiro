import "./style.css";
import Work from "../Work";

const WorksList = ({ works, deleteWork }) => {
  return (
    <ul>
      {works.map((work) => {
        return (
          <li key={work.id}>
            <Work work={work} deleteWork={deleteWork} />
          </li>
        );
      })}
    </ul>
  );
};

export default WorksList;
