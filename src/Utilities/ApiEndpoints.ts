import axios from "axios";
import { UserRole } from "../types/UserRole";

export const ServerURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/auth"
    : window.location.hostname + "/auth";

const API = {
  LoginWithUsernameAndPassword: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) =>
    axios.post(ServerURL + "/loginWithUsernameAndPassword", {
      username: username,
      password: password,
    }),

  CreateUserWithUsernameAndPassword: ({
    name,
    username,
    password,
    role,
  }: {
    name: string;
    username: string;
    password: string;
    role: UserRole;
  }) =>
    axios.post(ServerURL + "/createUserWithUsernameAndPassword", {
      name: name,
      username: username,
      password: password,
      role: role,
    }),

  AccessToken: ({ refreshToken }: { refreshToken: string }) =>
    axios.post(ServerURL + "/accessToken", { refreshToken: refreshToken }),
};
export default API;
