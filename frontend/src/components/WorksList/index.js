import "./style.css";
import Work from "../Work";

const WorksList = ({ works }) => {
  return (
    <ul>
      {works.map((work) => {
        return (
          <li key={work.id}>
            <Work work={work} />
          </li>
        );
      })}
    </ul>
  );
};

export default WorksList;
