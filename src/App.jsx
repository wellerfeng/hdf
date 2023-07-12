import { useState } from "react";
import {
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
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
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
							key: "/admin/user",
							icon: <UserOutlined />,
							label: "用户信息",
						},
						{
							key: "/admin/medicine_manager",
							icon: <UploadOutlined />,
							label: "药品信息",
							children: [
								{
									key: "/admin/medicine",
									icon: <UploadOutlined />,
									label: "药品列表",
								},
								{
									key: "/admin/medicine_categories",
									icon: <UploadOutlined />,
									label: "药品分类",
								},
							],
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
