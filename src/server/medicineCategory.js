import { post, get, del, patch } from "../utils/request";
/**
 * 条件查询
 * @param {*} param0
 * @returns
 */
export const medicinesAPI = ({ page, pagesize, name }) =>
	get("/admin/medicine_categories", { page, pagesize, name });

/**
 * 新增
 * @param {*} data
 * @returns
 */
export const addMedicineAPI = (data) =>
	post("/admin/medicine_categories", data);

/**
 * 药品删除
 * @param {*} id
 * @returns
 */
export const delMedicineAPI = (id) => del("/admin/medicine_categories/" + id);

/**
 * 修改
 * @param {*} id
 * @param {*} data
 * @returns
 */
export const updateByIdAPI = (id, data) =>
	patch("/admin/medicine_categories/" + id, data);
