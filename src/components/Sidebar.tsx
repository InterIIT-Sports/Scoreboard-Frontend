import { useNavigate } from "react-router";
import "./Sidebar.css";

const SideBar = ({ items }: { items: { title: string; linkTo: string }[] }) => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      {items.map((item, i) => (
        <button key={i} onClick={() => navigate(item.linkTo)}>
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default SideBar;
