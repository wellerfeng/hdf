import { Card, Form, Input, Button } from "antd";
import { post } from "../utils/request";
import { setToken } from "../utils/tool";
import { useNavigate } from "react-router-dom";
function Login() {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	return (
		<div className="login">
			<Card
				title="后台管理系统"
				style={{
					width: "30vw",
					margin: "150px auto",
					minWidth: 400,
				}}
			>
				<Form
					form={form}
					labelCol={{
						span: 6,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 400,
					}}
					autoComplete="off"
					onFinish={(v) => {
						// console.log(v);
						post("/auth/admin_login", v).then((res) => {
							// console.log(res);
							if (res.success) {
								setToken(res.data);
								navigate("/admin");
							} else {
								alert("用户名或密码错误");
							}
						});
					}}
				>
					<Form.Item
						label="用户名"
						name="userName"
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="密码"
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 22,
						}}
					>
						<Button type="primary" htmlType="submit">
							登录
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
}

export default Login;
