import { useState } from "react";
import "./styles/Login.css";
import axios from "axios";
import API from "../Utilities/ApiEndpoints";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setErrorMsg("Enter Username and Password!");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }
    axios
      .post(API.LoginWithUsernameAndPassword, {
        username: username,
        password: password,
      })
      .then(res => setErrorMsg(res.data.accessToken))
      .catch(err => setErrorMsg(err.message));
  };

  return (
    <div className="loginContainer">
      <div className="loginDialog">
        <h1 className="fjalla">Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="field">
            Username
            <input
              name="username"
              className="styledInput"
              autoComplete="off"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
          <label className="field">
            Password{" "}
            <input
              name="password"
              autoComplete="off"
              className="styledInput"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <input type="submit" value={"Continue"} />
        </form>
        <div>{errorMsg}</div>
      </div>
    </div>
  );
};

export default Login;
