import { auth, authModule } from "../../plugins/firebase";
import router from "../../router";

const state = () => ({
    authenticated: false,
    authUser: {},
})

const mutations = {
    ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser }) {
        // you can request additional fields if they are optional (e.g. photoURL)
        if (authUser) {
            const { uid, email, emailVerified, displayName, photoURL } = authUser

            state.authUser = {
                uid,
                displayName,
                email,
                emailVerified,
                photoURL: photoURL || null
            }
            state.authenticated = true
        } else {
            state.authUser = null
            state.authenticated = false
        }
    },

}
const actions = {
    // Store action called nuxtServerInit:
    // async nuxtServerInit({ dispatch, commit, state }, { res }) {        
    //     if (res && res.locals && res.locals.user) {
    //         const { allClaims: claims, idToken: token, ...authUser } = res.locals.user
    //         commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims, token })
    //     }
    // },
    signIn({ commit }, payload) {
        // Confirm the link is a sign-in with email link.
        // The client SDK will parse the code from the link for you.
        auth.signInWithEmailAndPassword(payload.email, payload.password)
            .then((result) => {
                const { allClaims: claims, ...authUser } = result.user
                commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims })
            })
            .catch((error) => {
                // Some error occurred, you can inspect the code: error.code
                // Common errors could be invalid email and invalid or expired OTPs.
                console.log('--signin', error);
            });
    },
    signInGoogle({ commit }) {
        // Confirm the link is a sign-in with email link.
        // The client SDK will parse the code from the link for you.
        const provider = new authModule.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                const { allClaims: claims, ...authUser } = result.user
                commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims })
            })
            .catch((error) => {
                // Some error occurred, you can inspect the code: error.code
                // Common errors could be invalid email and invalid or expired OTPs.
                console.log('--signin', error);
            });
    },
    signUp({ commit }, payload) {
        // Confirm the link is a sign-in with email link.
        // The client SDK will parse the code from the link for you.
        auth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then(async (result) => {
                if (payload.fullname) {
                    await result.user.updateProfile({
                        displayName: payload.fullname
                    })
                }
                const { allClaims: claims, ...authUser } = result.user
                authUser.displayName = payload.fullname ? payload.fullname : ''
                commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims })
            })
            .catch((error) => {
                // Some error occurred, you can inspect the code: error.code
                // Common errors could be invalid email and invalid or expired OTPs.
                console.log('--signin', error);
            });
    },
    async signOut() {
        auth.signOut().then(() => {
            router.push('/');
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    },

    async resetPassword(_, payload) {
        try {
            // const actionCode = {
            //     url: `${process.env.baseUrl}/resetPassword?email=${payload.email}`
            // }
            // console.log(actionCode);
            await auth.sendPasswordResetEmail(payload.email);
            return 'Email Sent'
        } catch (error) {
            console.log(error);
        }
    },
    async verifyPasswordCode(_, payload) {
        try {
            return await auth.verifyPasswordResetCode(payload.code);
        } catch (error) {
            console.log(error);
        }
    },
    async confirmResetPassowrd(_, payload) {
        try {
            await auth.confirmPasswordReset(payload.code, payload.newPassword)
            return 'Password Saved'
        } catch (error) {
            console.log(error);
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}