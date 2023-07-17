import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import { ConfigProvider } from "antd";
import zhCn from "antd/locale/zh_CN";
ReactDOM.createRoot(document.getElementById("root")).render(
	<ConfigProvider
		theme={{
			token: {
				colorPrimary: "#f0a1a8",
			},
		}}
		locale={zhCn}
	>
		<RouterProvider router={router}></RouterProvider>
	</ConfigProvider>
);
