import { useNavigate } from "react-router";
import "./Sidebar.css";

const SideBar = ({ items }: { items: { title: string; linkTo: string }[] }) => {
	const navigate = useNavigate();
	const handleLogout = () => {
		//TODO: implement logout
	};
	return (
		<div className="sidebar">
			<div className="items">
				{items.map((item, i) => (
					<button key={i} onClick={() => navigate(item.linkTo)}>
						{item.title}
					</button>
				))}
			</div>
			<div className="bottom">
				<button onClick={handleLogout}>Login</button>
			</div>
		</div>
	);
};

export default SideBar;
