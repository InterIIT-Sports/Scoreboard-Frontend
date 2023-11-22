import axios from "axios";
import { UserRole } from "../types/UserRole";

export const ServerURL = "https://interiit-sports-server.cyclic.app/";

const API = {
	GetTeams: (accessToken: string) =>
		axios.get(ServerURL + "admin/teams", {
			headers: {
				Authorization: accessToken,
			},
		}),

	AddTeam: (accessToken: string, team: any) =>
		axios.post(
			ServerURL + "admin/teams",
			{
				name: team.name,
			},
			{
				headers: {
					Authorization: accessToken,
				},
			}
		),

	DeleteTeam: (accessToken: string, team: any) => {},

	GetUsers: (accessToken: string) =>
		axios.get(ServerURL + "admin/users", {
			headers: {
				Authorization: accessToken,
			},
		}),

	DeleteUser: (username: string, accessToken: string) =>
		axios.delete(ServerURL + "admin/user", {
			data: {
				username: username,
			},
			headers: {
				Authorization: accessToken,
			},
		}),

	CreateUserWithUsernameAndPassword: ({
		name,
		username,
		password,
		role,
		accessToken,
	}: {
		name: string;
		username: string;
		password: string;
		role: UserRole;
		accessToken: string;
	}) =>
		axios.post(
			ServerURL + "admin/createUserWithUsernameAndPassword",
			{
				name: name,
				username: username,
				password: password,
				role: role,
			},
			{
				headers: {
					Authorization: accessToken,
				},
			}
		),

	LoginWithUsernameAndPassword: ({
		username,
		password,
	}: {
		username: string;
		password: string;
	}) =>
		axios.post(ServerURL + "auth/loginWithUsernameAndPassword", {
			username: username,
			password: password,
		}),

	AccessToken: ({ refreshToken }: { refreshToken: string }) =>
		axios.post(ServerURL + "auth/accessToken", { refreshToken: refreshToken }),

	Logout: ({ refreshToken }: { refreshToken: string }) =>
		axios.delete(ServerURL + "auth/logout", {
			data: {
				refreshToken: refreshToken,
			},
		}),
};
export default API;
