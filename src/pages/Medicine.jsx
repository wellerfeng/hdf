import {
	Button,
	Card,
	Table,
	Space,
	Popconfirm,
	Modal,
	Form,
	Input,
	Radio,
	Upload,
	InputNumber,
	Select,
} from "antd";
import {
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
	LoadingOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getToken, serverUrl } from "../utils/tool";
import {
	addMedicineAPI,
	categoryAPI,
	delMedicineAPI,
	medicinesAPI,
	updateByIdAPI,
} from "../server/medicine";

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
};

function Medicine() {
	// 列表
	const [list, setList] = useState([]);
	// 总页数
	const [total, setTotal] = useState(0);
	// 分页查询
	const [query, setQuery] = useState({
		page: 1,
		pageSize: 10,
		name: "",
	});
	// 模态框的显示和隐藏
	const [isShow, setIsShow] = useState(false);
	// Form表单的数据绑定
	const [form] = Form.useForm();
	// 获取药品列表

	useEffect(() => {
		medicinesAPI(query).then((res) => {
			setList(res.data.list);
			setTotal(res.data.total);
		});
	}, [query]);
	// 上传图片
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState();
	const handleChange = (info) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, (url) => {
				setLoading(false);
				setImageUrl(url);
			});
		}
	};
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);
	const normFile = (e) => {
		// console.log("Upload event:", e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};
	// 药品分类
	const [categoryList, setCategoryList] = useState([]);
	const medicineCategories = () => {
		categoryAPI().then((res) => {
			// console.log(res.data.list);
			setCategoryList(res.data.list);
		});
	};
	const [currentId, setCurrentId] = useState("");
	useEffect(() => {
		if (!isShow) {
			setImageUrl("");
			setCurrentId("");
		}
	}, [isShow]);
	return (
		<div className="medicine">
			<Card
				title="药品信息"
				extra={
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={() => {
							setIsShow(true);
							medicineCategories();
						}}
					/>
				}
			>
				<Form
					layout="inline"
					style={{ marginBottom: "8px" }}
					onFinish={(v) => {
						// console.log(v);
						// 改变query之后重新查询数据
						setQuery({ ...query, name: v.name, page: 1 });
					}}
				>
					<Form.Item label="名字" name="name">
						<Input placeholder="请输入关键词" />
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							icon={<SearchOutlined />}
						/>
					</Form.Item>
				</Form>
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
							title: "名字",
							width: 200,
							dataIndex: "name",
						},
						{
							title: "主图",
							dataIndex: "image",
							render(v) {
								return <img style={{ width: 100 }} src={v}></img>;
							},
						},
						{
							title: "分类",
							dataIndex: ["category", "name"],
						},
						{
							title: "价格",
							dataIndex: "price",
						},
						{
							title: "简介",
							dataIndex: "desc",
						},
						{
							title: "操作",
							width: 120,
							render(v) {
								return (
									<Space>
										<Button
											type="primary"
											size="small"
											icon={<EditOutlined />}
											onClick={() => {
												setIsShow(true);
												setCurrentId(v.id);
												form.setFieldsValue({ ...v, image: [] });
												setImageUrl(v.image);
											}}
										></Button>
										<Popconfirm
											title="是否确认删除"
											onConfirm={() => {
												// 执行删除
												// console.log(v);
												delMedicineAPI(v.id);
												setQuery({
													...query,
													page: 1,
													name: "",
												});
											}}
										>
											<Button
												type="primary"
												danger
												size="small"
												icon={<DeleteOutlined />}
											></Button>
										</Popconfirm>
									</Space>
								);
							},
						},
					]}
				></Table>
			</Card>
			<Modal
				title="编辑"
				open={isShow}
				onOk={() => {
					setIsShow(false);
					form.submit();
				}}
				maskClosable={false}
				destroyOnClose
				onCancel={() => setIsShow(false)}
			>
				<Form
					layout="vertical"
					preserve={false}
					form={form}
					onFinish={async (v) => {
						if (currentId) {
							await updateByIdAPI(currentId, {
								...v,
								image: serverUrl + v.image[0].response.data,
							});
						} else {
							await addMedicineAPI({
								...v,
								image: serverUrl + v.image[0].response.data,
							});
						}
						// console.log({ ...v, image: serverUrl + v.image[0].response.data });
						setIsShow(false);
						setQuery({
							...query,
							page: 1,
							name: "",
						});
					}}
				>
					<Form.Item
						label="名称"
						name="name"
						rules={[
							{
								required: true,
								message: "填写名称",
							},
						]}
					>
						<Input placeholder="请输入名称" />
					</Form.Item>
					<Form.Item label="价格" name="price">
						<InputNumber />
					</Form.Item>
					<Form.Item label="分类" name="medicineCategoryId">
						<Select>
							{/* <Select.Option value="demo">Demo</Select.Option> */}
							{categoryList.map((item) => (
								<Select.Option value={item.id} key={item.id}>
									{item.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item label="是否是常用药" name="isStanding">
						<Radio.Group>
							<Radio value={true}>是</Radio>
							<Radio value={false}>否</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="简介" name="desc">
						<Input.TextArea placeholder="请输入简介" />
					</Form.Item>
					<Form.Item
						label="主图"
						name="image"
						// 以下两条是必须的
						valuePropName="fileList"
						// 如果没有下面这一句会报错
						getValueFromEvent={normFile}
						noStyle
					>
						<Upload
							name="file"
							maxCount={1}
							action="http://120.26.71.58:3006/common/upload"
							headers={{ token: getToken() }}
							listType="picture-card"
							onChange={handleChange}
						>
							{imageUrl ? (
								<img
									src={imageUrl}
									alt="avatar"
									style={{
										width: "100%",
									}}
								/>
							) : (
								uploadButton
							)}
						</Upload>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

export default Medicine;
