import { post, get } from "../utils/request";
/**
 * 条件查询
 * @param {*} param0
 * @returns
 */
export const usersAPI = ({ page, pageSize, name }) =>
	get("/admin/users", { page, per: pageSize, name });

/**
 * 新增
 * @param {*} data
 * @returns
 */
export const addUserAPI = (data) => post("/admin/users", data);
