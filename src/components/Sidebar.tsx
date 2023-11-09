import { useNavigate } from "react-router";
import "./Sidebar.css";

const SideBar = ({
	items,
}: {
	items: { title: string; linkTo: string; icon: any }[];
}) => {
	const navigate = useNavigate();
	const handleLogout = () => {
		//TODO: implement logout
	};
	return (
		<div className="sidebar">
			<div className="items">
				{items.map((item, i) => (
					<div className="item" key={i} onClick={() => navigate(item.linkTo)}>
						<item.icon />
						<br />
						<span>{item.title}</span>
					</div>
				))}
			</div>
			<div className="bottom">
				<button onClick={handleLogout}>Login</button>
			</div>
		</div>
	);
};

export default SideBar;
