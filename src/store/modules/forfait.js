import ForfaitService from "@/services/forfait";
import httpStatus from "http-status";

const ForfaitStore = {
	state: {
		forfaits: [],
	},
	getters: {
		loaded(state) {
			return state.forfaits.length > 0;
		},
		getForfaits(state) {
			return state.forfaits;
		},
	},
	mutations: {
		setForfaits(state, { forfaits }) {
			state.forfaits = forfaits;
		},
		setForfait(state, { index, forfait }) {
			state.forfaits[index] = forfait;
		},
		addForfait(state, { forfait }) {
			state.forfaits.push(forfait);
		},
        editForfait(state, { index, forfait}) {
            state.forfaits[index] = forfait;
        }
	},
	actions: {
		async get_forfaits({ commit }) {
			let success = false;
			try {
				const response = await ForfaitService.getForfaits();

				if (response.status === httpStatus.OK) {
					commit({
						type: "setForfaits",
						forfaits: response.data,
					});
					success = true;
				}
			} finally {
				return success;
			}
		},

		async add_forfaits({ commit }, { data }) {
			let success = false;
			try {
				const response = await ForfaitService.postForfaits(data);
				if (response.status === httpStatus.OK) {
					commit({
						type: "addForfait",
						forfait: response.data,
					});
					success = true;
				}
			} finally {
				return success;
			}
		},
		async edit_forfait({ commit }, { index, data }) {
			let success = false;
			try {
				const response = await ForfaitService.putForfaits(data);
				if (response.status === httpStatus.OK) {
					commit({
						type: "editForfait",
						forfait: response.data,
                        index
					});
					success = true;
				}
			} finally {
				return success;
			}
		},
	},
};

export default ForfaitStore;
