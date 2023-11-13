import { Route, Routes, useNavigate, useParams } from "react-router";
import SideBar from "../../components/Sidebar";
import { useContext, useEffect, useRef, useState } from "react";
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
import { ToastContext } from "../../Utilities/ToastContext";

const AdminDashboard = () => {
	const urlParam = useParams();
	const navigate = useNavigate();
	const signOut = useSignOut();
	const setToast = useContext(ToastContext).setToastMessage;
	const auth = useAuthUser() as () => AuthStateUserObject;
	const user = useRef(auth() as User);
	const getAccessToken = useAuthHeader();

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

	const fetchUsers = async () => {
		const result = (await API.GetUsers(getAccessToken())).data;
		const Users: User[] = result.map((obj: any) => {
			return {
				name: obj.name,
				username: obj.username,
				role: obj.role,
				password: obj.password,
			};
		});
		setAllUsers(Users);
	};

	useEffect(() => {
		if (user.current.role === UserRole.ADMIN) fetchUsers();
	}, []);

	useEffect(() => {
		if (!urlParam["*"]) navigate(SideBarItems.current[0].linkTo); //navigate to the first sidebar item if /admin visited
	}, []);

	const handleLogout = async () => {
		navigate("/login");
		await API.Logout({
			refreshToken: getRefreshToken(),
		});
		setToast("Logged Out");
		signOut();
	};

	const handleAddUser = async (userToAdd: User, password: string) => {
		try {
			await API.CreateUserWithUsernameAndPassword({
				name: userToAdd.name,
				username: userToAdd.username,
				role: userToAdd.role,
				password: password,
				accessToken: getAccessToken(),
			});
			await fetchUsers();
			setToast("Added User " + userToAdd.username);
		} catch (error: any) {
			try {
				setToast(JSON.parse(error.request.response).message);
			} catch {
				setToast("Could not connect with the Server");
				console.log(error);
			}
		}
	};

	const handleUserDelete = async (userToDelete: User) => {
		if (userToDelete.username === user.current.username) {
			setToast("You Cant Delete Yourself!");
			return;
		} else {
			try {
				await API.DeleteUser(userToDelete.username, getAccessToken());
				await fetchUsers();
				setToast("Deleted User " + userToDelete.username);
			} catch (error: any) {
				try {
					setToast(JSON.parse(error.request.response).message);
				} catch {
					setToast("Could not connect with the Server");
					console.log(error);
				}
			}
		}
	};

	const getRoutes = () => {
		return [
			...(user.current.role === UserRole.ADMIN
				? [
						{
							linkTo: "users",
							element: (
								<Users
									onUserAdd={handleAddUser}
									onDelete={handleUserDelete}
									users={allUsers}
								/>
							),
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