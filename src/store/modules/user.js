import User from '@/services/auth';

const UserStore = {
    state: {
        users: [],
    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users;
        },
    },
    actions: {
        async getUsers({ commit }) {
            const data = await User.findAll({ data });
            commit({
                type: 'setToken',
                users: data,
            });
        },
    },
};

export default UserStore;