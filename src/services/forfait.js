import Axios from "@/utils/axios";

const getForfaits = async () => {
	return await Axios.get("/api/forfait");
};

const postForfaits = async (data) => {
	return await Axios.post("api/forfait", data, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

const putForfaits = async (data) => {
	return await Axios.put("api/forfait", data, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

const deleteForfait = async (id) => {
	return await Axios.delete(`api/forfait/${id}`);
};

export default {
	getForfaits,
	postForfaits,
	putForfaits,
	deleteForfait
};

