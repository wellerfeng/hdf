import { Navigate } from "react-router-dom";
import { getToken } from "../utils/tool";

function ProtecteRoute({ children }) {
	return getToken() ? children : <Navigate to="/login" />;
}

export default ProtecteRoute;
