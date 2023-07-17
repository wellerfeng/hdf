import { Card, Table } from "antd";
function HospitalList() {
	return (
		<div>
			<Card title="游戏列表">
				<Table rowKey="id" columns={[{}]}></Table>
			</Card>
		</div>
	);
}

export default HospitalList;
