import { post, get, del, patch } from "../utils/request";
/**
 * 条件查询
 * @param {*} param0
 * @returns
 */
export const medicinesAPI = ({ page, pageSize, name }) =>
	get("/admin/medicines", { page, per: pageSize, name });

/**
 * 新增
 * @param {*} data
 * @returns
 */
export const addMedicineAPI = (data) => post("/admin/medicines", data);

/**
 * 药品删除
 * @param {*} id
 * @returns
 */
export const delMedicineAPI = (id) => del("/admin/medicines/" + id);

/**
 * 修改
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const updateByIdAPI = (id, data) =>
	patch("/admin/medicines/" + id, data);

/**
 * 药品分类
 * @returns
 */
export const categoryAPI = () => get("/admin/medicine_categories");
