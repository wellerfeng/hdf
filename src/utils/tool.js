export const serverUrl = "http://120.26.71.58:3006";

/**
 * 保存token
 * @param {*} token
 * @returns
 */
export const setToken = (token) => sessionStorage.setItem("token", token);

/**
 * 获取token
 * @returns
 */
export const getToken = () => sessionStorage.getItem("token");

/**
 *移除token
 * @returns
 */
export const romoveToken = () => sessionStorage.removeItem("token");

// 文件上传地址
export const uploadActionUrl = serverUrl + "/common/upload";

export const dalImg = (url) => {
	if (url) {
		if (url.startsWith("http")) return url;
		return serverUrl + url;
	}
	return "https://img1.baidu.com/it/u=1826891569,3309039696&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
};
