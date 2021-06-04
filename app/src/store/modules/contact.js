import { db } from "../../plugins/firebase";

const state = () => ({
})

const mutations = {
    UPDATE_EMAIL() {}
}

const actions = {
    async emailSubmit({commit}, payload) {
        const messageRef = db.collection('metricrule-test-score-quiz-signups')
        console.log(payload)
        await messageRef.add({
            email: payload.email,
        }).then(() => {
            commit('UPDATE_EMAIL')
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
