import { Route, Routes, useNavigate, useParams } from "react-router";
import SideBar from "../../components/Sidebar";
import { useEffect, useRef } from "react";
import { UserRole } from "../../types/UserRole";
import "./AdminDashboard.css";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";

const AdminDashboard = ({ role = UserRole.ADMIN }) => {
	const urlParam = useParams();
	const navigate = useNavigate();
	const SideBarItems = useRef([
		...(role === UserRole.ADMIN
			? [
					{
						title: "Users",
						linkTo: "users",
						icon: PeopleAltIcon,
					},
			  ]
			: []),
		{
			title: "Edit Scores",
			linkTo: "edit_scores",
			icon: ScoreboardIcon,
		},
	]);

	useEffect(() => {
		if (!urlParam["*"]) navigate(SideBarItems.current[0].linkTo); //navigate to the first sidebar item if /admin visited
	}, [navigate, urlParam]);

	return (
		<div className="admin-container">
			<SideBar items={SideBarItems.current} />
			<div className="admin-content">
				<Routes>
					{SideBarItems.current.map(
						(
							{ title, linkTo }: { title: string; linkTo: string },
							i: number
						) => (
							<Route key={i} path={linkTo} element={<div>{title}</div>} />
						)
					)}
				</Routes>
			</div>
		</div>
	);
};

export default AdminDashboard;
