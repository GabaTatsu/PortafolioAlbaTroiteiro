import "./style.css";
import Work from "../Work";

const WorksList = ({ works, deleteWork, reorder }) => {
  return (
    <ul className="worklist">
      {works.map((work) => {
        return (
          <li key={work.id}>
            <Work work={work} deleteWork={deleteWork} works={works} reorder={reorder}/>
          </li>
        );
      })}
    </ul>
  );
};

export default WorksList;
