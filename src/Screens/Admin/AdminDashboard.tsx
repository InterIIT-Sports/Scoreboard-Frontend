import { Route, Routes, useNavigate, useParams } from "react-router";
import SideBar from "../../components/Sidebar";
import { useEffect, useRef } from "react";
import { UserRole } from "../../types/UserRole";
import "./AdminDashboard.css";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import Users from "./Users";
import EditScores from "./EditScores";
import { useSignOut } from "react-auth-kit";

const AdminDashboard = ({ role = UserRole.ADMIN }) => {
	const urlParam = useParams();
	const navigate = useNavigate();
	const signOut = useSignOut();

	const handleLogout = () => {
		// navigate("/login");
		// signOut();
	};

	const SideBarItems = useRef([
		...(role === UserRole.ADMIN
			? [
					{
						title: "Users",
						linkTo: "users",
						icon: PeopleAltIcon,
						element: <Users />,
					},
			  ]
			: []),
		{
			title: "Edit Scores",
			linkTo: "edit_scores",
			icon: ScoreboardIcon,
			element: <EditScores />,
		},
	]);

	useEffect(() => {
		if (!urlParam["*"]) navigate(SideBarItems.current[0].linkTo); //navigate to the first sidebar item if /admin visited
	}, [navigate, urlParam]);

	return (
		<div className="admin-container">
			<SideBar items={SideBarItems.current} />
			<div className="admin-content">
				<button onClick={handleLogout}>Logout</button>
				<Routes>
					{SideBarItems.current.map(
						(
							{
								linkTo,
								element,
							}: { title: string; linkTo: string; element: React.JSX.Element },
							i: number
						) => (
							<Route key={i} path={linkTo} element={element} />
						)
					)}
				</Routes>
			</div>
		</div>
	);
};

export default AdminDashboard;
