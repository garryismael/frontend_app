import Axios from "@/utils/axios";

const login = ({ data }) => {
    return Axios.post("/api/auth/login", data);
};

export default {
    login,
};