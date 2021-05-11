import { db, dbModule } from "../../plugins/firebase";

const state = () => ({
    activeNotifications: [],
    profile: null,
    allNotifications: [],
    isAllNotificationsLoading: false,
})

const mutations = {
    ON_NOTIFICATION_CHANGE(state, payload) {
        state.activeNotifications = [...state.activeNotifications.filter(doc => doc.id != payload.id), payload].sort((a, b) => b.createTime.toDate() - a.createTime.toDate())
    },
    REMOVE_NOTIFICATION(state, payload) {
        state.activeNotifications = [...state.activeNotifications.filter(doc => doc.id != payload.id)].sort((a, b) => b.createTime.toDate() - a.createTime.toDate())
    },
    RESET_NOTIFICATION(state) {
        state.activeNotifications = []
    },
    SET_PROFILE(state, payload) {
        state.profile = payload
    },
    SET_ALL_NOTIFICATIONS(state, payload) {
        state.allNotifications = payload.sort((a, b) => b.createTime.toDate() - a.createTime.toDate());
        state.isAllNotificationsLoading = false;
    },
    GET_ALL_NOTIFICATIONS(state) {
        state.isAllNotificationsLoading = true;
    }
}

const getters = {
    status(state) {
        return state.profile ? state.profile.status : null
    }
}

const actions = {
    notificationsListener({ rootState, commit, dispatch }) {
        db.collection('profiles').doc(rootState.auth.authUser.uid).collection('notification').where('lastUpdateTime', '==', null).onSnapshot(snapshot => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    console.log("--from-firebase", change.doc.data());
                    commit('ON_NOTIFICATION_CHANGE', { ...change.doc.data(), docId: change.doc.id })
                    dispatch('getProfile')
                }
                // if (change.type === "modified") {
                //     console.log("Modified city: ", change.doc.data());
                //     commit('ON_NOTIFICATION_CHANGE', { ...change.doc.data(), docId: change.doc.id })
                // }
            });
        })
    },
    async getProfile({ rootState, commit }) {
        const response = await db.collection('profiles').doc(rootState.auth.authUser.uid).get()
        commit('SET_PROFILE', response.data())
    },
    async getAllNotification({ rootState, commit }) {
        commit('GET_ALL_NOTIFICATIONS')
        const response = await db.collection('profiles').doc(rootState.auth.authUser.uid).collection('notification').get()
        commit('SET_ALL_NOTIFICATIONS', response.docs.map(doc => ({ ...doc.data(), docId: doc.id })))
    },
    async setNotificationStatusAsRead({ rootState, dispatch, getters }) {
        if (getters.status === 'unseen') {
            await db.collection('profiles').doc(rootState.auth.authUser.uid).update({
                status: 'seen'
            })
            dispatch('getProfile')
        }
    },
    setNotificationLastUpdateTime({ rootState, commit }, payload) {
        commit('REMOVE_NOTIFICATION', payload)
        db.collection('profiles').doc(rootState.auth.authUser.uid).collection('notification').doc(payload.docId).update({
            lastUpdateTime: dbModule.FieldValue.serverTimestamp()
        })
    },
    async markAllNotificationsAsRead({ commit, state, rootState }) {
        if (state.activeNotifications.length > 0) {
            const batch = db.batch()
            state.activeNotifications.forEach(doc => {
                const ref = db.collection('profiles').doc(rootState.auth.authUser.uid).collection('notification').doc(doc.docId)
                batch.update(ref, { lastUpdateTime: dbModule.FieldValue.serverTimestamp() })
            })
            await batch.commit()
            commit('RESET_NOTIFICATION')
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}