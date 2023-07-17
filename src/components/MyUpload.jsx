import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { uploadActionUrl } from "../utils/tool";

const MyUpload = ({ imageUrl, setImageUrl }) => {
	const [loading, setLoading] = useState(false);
	const handleChange = (info) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			setLoading(false);
			setImageUrl(info.file.response.data);
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
	return (
		<>
			<Upload
				name="avatar"
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				action={uploadActionUrl}
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
		</>
	);
};
export default MyUpload;
