import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/dashboard" replace />} />
				<Route path="/login" element={<Login></Login>}></Route>
				<Route path="/landing" element={<Landing></Landing>}></Route>
				<Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
