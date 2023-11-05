import axios from "axios";

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

  AccessToken: ({ refreshToken }: { refreshToken: string }) =>
    axios.post(ServerURL + "/accessToken", { refreshToken: refreshToken }),
};
export default API;
