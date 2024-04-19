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
    <div className="display-category-list-container">
      {categoryData.map((eachData) => (
        <li
          className="category-card"
          key={eachData.id}
          style={{ backgroundColor: `${getRandomColor()}` }}
        >
          <h2 className="category-name">{eachData.name}</h2>
          <img
            src={eachData.icons[0].url}
            className="category-logo"
            alt="category-logo"
          />
        </li>
      ))}
    </div>
  );
};

export default CategoryContainer;
