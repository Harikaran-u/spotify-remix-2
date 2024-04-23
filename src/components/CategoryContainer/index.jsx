import { Link } from "react-router-dom/cjs/react-router-dom";
import "./index.css";

const CategoryContainer = (props) => {
  const { categoryData } = props;

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const color = `rgb(${r}, ${g}, ${b})`;
    return color;
  };

  return (
    <ul className="display-category-list-container">
      {categoryData.map((eachData) => (
        <Link
          to={`/category/playlist/${eachData.id}?name=${eachData.name}`}
          key={eachData.id}
          className="link-style"
        >
          <li
            className="category-card"
            style={{ backgroundColor: `${getRandomColor()}` }}
          >
            <h2 className="category-name">{eachData.name}</h2>
            <img
              src={eachData.icons[0].url}
              className="category-logo"
              alt="category-logo"
            />
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default CategoryContainer;
