import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import { refreshApi } from "./Utilities/AuthUtils";
import ToastOverlay from "./components/Toast";
import SplashScreen from "./components/SplashScreen";
import { Suspense, lazy } from "react";
const Home = lazy(() => import("./Screens/Home"));
const Login = lazy(() => import("./Screens/Login"));
const AdminDashboard = lazy(() => import("./Screens/Admin/AdminDashboard"));

function App() {
  return (
    <>
      <AuthProvider
        authType={"cookie"}
        authName="_auth"
        refresh={refreshApi}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}>
        <ToastOverlay>
          <BrowserRouter>
            <Suspense fallback={<SplashScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path={"/admin/*"}
                  element={
                    <RequireAuth loginPath={"/login"}>
                      <AdminDashboard />
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
            </Suspense>
          </BrowserRouter>
        </ToastOverlay>
      </AuthProvider>
    </>
  );
}

export default App;
