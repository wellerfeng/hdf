import { useState } from "react";
import {
	CompassOutlined,
	DesktopOutlined,
	MedicineBoxFilled,
	MedicineBoxOutlined,
	MedicineBoxTwoTone,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";

const { Header, Sider, Content } = Layout;
import { Outlet, useNavigate } from "react-router-dom";
const App = () => {
	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout style={{ height: "100vh" }}>
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				style={{ background: "#bf3553" }}
			>
				<div className="demo-logo-vertical" />
				<Menu
					style={{ background: "#bf3553", color: "#fff" }}
					// theme="light"
					mode="inline"
					onClick={(info) => {
						navigate(info.key);
					}}
					defaultSelectedKeys={["/admin"]}
					items={[
						{
							key: "/admin",
							icon: <VideoCameraOutlined />,
							label: "看板",
						},
						{
							key: "/admin/hospitals",
							icon: <DesktopOutlined />,
							label: "游戏平台",
							children: [
								{
									key: "/admin/hospitals/hospitals",
									icon: <UploadOutlined />,
									label: "游戏列表",
								},
								{
									key: "/admin/hospitals/doctors",
									icon: <CompassOutlined />,
									label: "知名陪练",
								},
							],
						},

						{
							key: "/admin/medicine_manager",
							icon: <MedicineBoxOutlined />,
							label: "药品信息",
							children: [
								{
									key: "/admin/medicine",
									icon: <MedicineBoxFilled />,
									label: "药品列表",
								},
								{
									key: "/admin/medicine_categories",
									icon: <MedicineBoxTwoTone />,
									label: "药品分类",
								},
							],
						},
						{
							key: "/admin/user",
							icon: <UserOutlined />,
							label: "用户信息",
						},
					]}
				/>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: "16px",
							width: 64,
							height: 64,
						}}
					/>
				</Header>
				<Content
					style={{
						margin: "24px 16px",
						padding: 10,
						minHeight: 280,
						height: "100%",
						overflow: "auto",
						background: colorBgContainer,
					}}
				>
					<Outlet></Outlet>
				</Content>
			</Layout>
		</Layout>
	);
};

export default App;
