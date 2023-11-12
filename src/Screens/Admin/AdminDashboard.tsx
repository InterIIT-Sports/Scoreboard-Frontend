import { Route, Routes, useNavigate, useParams } from "react-router";
import SideBar from "../../components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { UserRole } from "../../types/UserRole";
import "./AdminDashboard.css";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import Users from "./Users";
import EditScores from "./EditScores";
import { useAuthHeader, useAuthUser, useSignOut } from "react-auth-kit";
import { AuthStateUserObject } from "react-auth-kit/dist/types";
import { User } from "../../types/User";
import UserRoleChip from "../../components/UserRoleChip";
import API from "../../Utilities/ApiEndpoints";
import { getRefreshToken } from "../../Utilities/AuthUtils";

const AdminDashboard = () => {
	const urlParam = useParams();
	const navigate = useNavigate();
	const signOut = useSignOut();
	const auth = useAuthUser() as () => AuthStateUserObject;
	const user = useRef(auth() as User);
	const getAcessToken = useAuthHeader();

	const [showProfileDialog, setShowProfileDialog] = useState(false);
	const [allUsers, setAllUsers] = useState<User[]>([]);

	const SideBarItems = useRef([
		...(user.current.role === UserRole.ADMIN
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
		const fetchUsers = async () => {
			const result = (await API.GetUsers(getAcessToken())).data;
			const Users: User[] = result.map((obj: any) => {
				return {
					name: obj.name,
					username: obj.username,
					role: obj.role,
				};
			});
			setAllUsers(Users);
		};

		if (user.current.role === UserRole.ADMIN) fetchUsers();
	}, []);

	useEffect(() => {
		if (!urlParam["*"]) navigate(SideBarItems.current[0].linkTo); //navigate to the first sidebar item if /admin visited
	}, []);

	const handleLogout = () => {
		navigate("/login");
		API.Logout({
			refreshToken: getRefreshToken(),
		});
		signOut();
	};

	const getRoutes = () => {
		return [
			...(user.current.role === UserRole.ADMIN
				? [
						{
							linkTo: "users",
							element: <Users users={allUsers} />,
						},
				  ]
				: []),
			{
				linkTo: "edit_scores",
				element: <EditScores />,
			},
		];
	};

	return (
		<div className="admin-container">
			<SideBar items={SideBarItems.current} />
			<section className="admin-content">
				<section className="floatingDialogBox">
					<button
						className="styledButton"
						onClick={() => setShowProfileDialog((prev) => !prev)}
					>
						<span className="user-name-text">{user.current.name}</span>{" "}
						<UserRoleChip role={user.current.role} />
					</button>
					{showProfileDialog && (
						<div style={{ margin: "10px" }}>
							Username:
							<br />
							{user.current.username}
							<button
								onClick={handleLogout}
								style={{ marginTop: "5px" }}
								className="styledButton"
							>
								Logout
							</button>
						</div>
					)}
				</section>
				<Routes>
					{getRoutes().map(
						(
							{
								linkTo,
								element,
							}: { linkTo: string; element: React.JSX.Element },
							i: number
						) => (
							<Route key={i} path={linkTo} element={element} />
						)
					)}
				</Routes>
			</section>
		</div>
	);
};

export default AdminDashboard;
