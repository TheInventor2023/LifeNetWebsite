import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state () {
        return {
            user: null
        }
    },
    mutations: {
        set (state, user) {
            state.user = user;
        },
        clear (state) {
            state.user = null;
        }

        // Get the user with this.$userstore.state.user;
        // Set the user with this.$userstore.commit('set' userObj);
    }
})

export default store
;
