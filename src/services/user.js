import Axios from "@/utils/axios";

const findAll = async () => {
	const response = await Axios.get("/api/users");
	return response.data;
};

export default {
	findAll,
};

