import { Card, Table } from "antd";
import { useEffect, useState } from "react";
import { usersAPI } from "../server/user";
function User() {
	const [list, setList] = useState([]);
	const [total, setTotal] = useState([]);
	const [query, setQuery] = useState({
		page: 1,
		pageSize: 10,
		name: "",
	});
	useEffect(() => {
		usersAPI(query).then((res) => {
			setList(res.data.list);
			setTotal(res.data.total);
			console.log(res);
		});
	}, [query]);
	return (
		<div>
			<Card title="用户列表" bordered={false}>
				<Table
					rowKey="id"
					pagination={{
						total,
						onChange(page, pageSize) {
							// console.log(page);
							setQuery({
								...query,
								page,
								pageSize,
							});
						},
					}}
					dataSource={list}
					columns={[
						{
							title: "序号",
							align: "center",
							width: 80,
							render(v, r, i) {
								return i + 1;
							},
						},
						{
							title: "用户名",
							dataIndex: "userName",
						},
						{
							title: "头像",
							dataIndex: "avatar",
						},
						{
							title: "昵称",
							dataIndex: "nickName",
						},
					]}
				/>
			</Card>
		</div>
	);
}

export default User;
