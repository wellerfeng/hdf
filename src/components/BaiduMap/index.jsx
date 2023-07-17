/* eslint-disable no-undef */
import { useEffect, useRef } from "react";
function BaiduMap() {
	const mapContainer = useRef(null);
	useEffect(() => {
		// GL版命名空间为BMapGL
		// 按住鼠标右键，修改倾斜角和角度
		var map = new BMapGL.Map(mapContainer.current); // 创建Map实例
		map.centerAndZoom("洛阳市", 11); // 初始化地图,设置中心点坐标和地图级别
		map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
		var local = new BMapGL.LocalSearch(map, {
			renderOptions: { map: map },
		});
		local.search("景点");
	}, []);
	return (
		<div>
			<div
				className="my-map"
				ref={mapContainer}
				style={{ width: "800px", height: "400px" }}
			></div>
		</div>
	);
}

export default BaiduMap;
