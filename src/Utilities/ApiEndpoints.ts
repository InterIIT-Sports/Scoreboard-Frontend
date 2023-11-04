export const ServerURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/auth"
    : window.location.hostname + "/auth";

const API = {
  LoginWithUsernameAndPassword: ServerURL + "/loginWithUsernameAndPassword", //POST
};

export default API;
