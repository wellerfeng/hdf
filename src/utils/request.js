import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken, serverUrl } from "./tool";

const instance = axios.create({
	baseURL: serverUrl,
	timeout: 5000,
});

// Add a request interceptor
// 请求拦截
instance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		nProgress.start();
		config.headers.token = getToken();
		return config;
	},
	function (error) {
		// Do something with request error
		nProgress.done();
		return Promise.reject(error);
	}
);

// Add a response interceptor
// 响应拦截
instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		nProgress.done();
		return response.data;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		nProgress.done();
		return Promise.reject(error);
	}
);

/**
 * get请求
 * @param {*} url
 * @param {*} params
 * @returns
 */
export const get = (url, params) => instance.get(url, { params });

export const post = (url, data) => instance.post(url, data);

/**
 * patch
 * @param {*} url
 * @param {*} data
 * @returns
 */
export const patch = (url, data) => instance.patch(url, data);

/**
 * put
 * @param {*} url
 * @param {*} data
 * @returns
 */
export const put = (url, data) => instance.put(url, data);

/**
 * del
 * @param {*} url
 * @returns
 */
export const del = (url) => instance.delete(url);

export default instance;
