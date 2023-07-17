import { Navigate, createHashRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import Medicine from "../pages/medicine";
import MedicineCategories from "../pages/MedicineCategories";
import Login from "../pages/Login";
import ProtecteRoute from "../components/ProtecteRoute";
import PageNotFound from "../pages/404";
import DoctorList from "../pages/hospitals/doctors";
import HospitalList from "../pages/hospitals/list";
const router = createHashRouter([
	{
		path: "/admin",
		element: (
			<ProtecteRoute>
				<App />
			</ProtecteRoute>
		),
		errorElement: <PageNotFound />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: "user",
				element: <User />,
			},
			{
				path: "medicine",
				element: <Medicine />,
			},
			{
				path: "medicine_categories",
				element: <MedicineCategories />,
			},
			{
				path: "hospitals/doctors",
				element: <DoctorList />,
			},
			{
				path: "hospitals/hospitals",
				element: <HospitalList />,
			},
		],
	},
	{
		path: "/",
		element: <Navigate to="/admin" />,
	},
	{
		path: "/login",
		element: <Login />,
	},
]);
export default router;
