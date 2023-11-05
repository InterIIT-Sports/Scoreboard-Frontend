import Home from "./Screens/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import { refreshApi } from "./Utilities/AuthUtils";

function App() {
  return (
    <>
      <AuthProvider
        authType={"cookie"}
        authName="_auth"
        refresh={refreshApi}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path={"/admin"}
              element={
                <RequireAuth loginPath={"/login"}>
                  <div>ADMIN PAGE</div>
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <>
                  <h2>404 Page Not Found</h2>
                  <h3>Please check the URL</h3>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
