import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useIsAuthenticated } from "react-auth-kit";
import { refreshApi } from "./Utilities/AuthUtils";
import ToastOverlay from "./components/Toast";
import SplashScreen from "./components/SplashScreen";
import { Suspense, lazy } from "react";
import { Navigate } from "react-router";

const Home = lazy(() => {
	return Promise.all([
		import("./Screens/Home"),
		new Promise((resolve) => setTimeout(resolve, 2500)),
	]).then(([moduleExports]) => moduleExports);
});
const Login = lazy(() => import("./Screens/Login"));
const AdminDashboard = lazy(() => import("./Screens/Admin/AdminDashboard"));

export const StartingDate = 15;

function App() {
	const PrivateRoute = ({ Component }: { Component: React.JSX.Element }) => {
		const isAuthenticated = useIsAuthenticated();
		const auth = isAuthenticated();
		return auth ? Component : <Navigate to="/login" />;
	};

	return (
		<>
			<AuthProvider
				authType={"cookie"}
				authName="_auth"
				refresh={refreshApi}
				cookieDomain={window.location.hostname}
				cookieSecure={window.location.protocol === "https:"}
			>
				<ToastOverlay>
					<BrowserRouter>
						<Suspense fallback={<SplashScreen />}>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route
									path={"/admin/*"}
									element={<PrivateRoute Component={<AdminDashboard />} />}
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
