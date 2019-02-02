import Vue from 'vue'
import Vuex from 'vuex'
import database from '@/services/database'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentUser: null,
		editProfile: false,
		loading: false
	},
	mutations: {
		setCurrentUser(state, payload) {
			state.currentUser = payload;
		},
		setLoading(state, payload) {
			state.loading = payload
		},
		setEditProfile(state, payload) {
			state.editProfile = payload
		}
	},
	actions: {
		setUser({ commit }, payload) {
			commit('setCurrentUser', payload)
		},
		setEditProfile({ commit }, payload) {
			commit('setEditProfile', payload)
		},
		autoSignIn({ commit, dispatch }, payload) {
			commit('setLoading', true)
			database.database().ref('users/' + payload.uid).once('value')
				.then((data) => {
					dispatch('setUser', data.val())
					commit('setLoading', false)
				})
				.catch((error) => {
					commit('setLoading', false)
					console.log(error)
				})
		},
		logout({ commit }) {
			commit('setCurrentUser', null)
		}
	},
	getters: {
		user(state) {
			return state.currentUser
		},
		editProfile(state) {
			return state.editProfile
		},
		loading(state) {
			return state.loading
		}
	}
});
