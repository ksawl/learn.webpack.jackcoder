export default {
    state: { message: "It is a message from store" },
    mutations: {},
    actions: {},
    getters: {
        getMessage(state) {
            return state.message;
        },
    },
};
