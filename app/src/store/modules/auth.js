import { auth, authModule } from "../../plugins/firebase";
import router from "../../router";

const state = () => ({
    authenticated: false,
    authUser: {},
    errorMessage: ''
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
                photoURL: photoURL || null,
            }
            state.authenticated = true
        } else {
            state.authUser = null
            state.authenticated = false
        }
    },
    SET_CUSTOM_ROLES(state, payload) {
        state.authUser.claims = payload;
    },
    SET_ERROR: (state, message) => { state.errorMessage = message }

}
const actions = {
    // Store action called nuxtServerInit:
    // async nuxtServerInit({ dispatch, commit, state }, { res }) {        
    //     if (res && res.locals && res.locals.user) {
    //         const { allClaims: claims, idToken: token, ...authUser } = res.locals.user
    //         commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims, token })
    //     }
    // },
    async getCustomClaimRole({ commit }) {
        await auth.currentUser.getIdToken(true);
        const decodedToken = await auth.currentUser.getIdTokenResult();
        commit('SET_CUSTOM_ROLES', decodedToken.claims.stripeRole)
    },

    async signIn({ commit, dispatch }, payload) {
        // Confirm the link is a sign-in with email link.
        // The client SDK will parse the code from the link for you.
        commit('SET_ERROR', '')
        try {
            await auth.setPersistence(payload.persistence ? authModule.Auth.Persistence.LOCAL : authModule.Auth.Persistence.SESSION)
            const result = await auth.signInWithEmailAndPassword(payload.email, payload.password)
            const { ...authUser } = result.user
            commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser })
            dispatch('getCustomClaimRole')
        } catch (error) {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
            console.log('--signin', error);
            let message = ''
            switch (error.code) {
                case 'auth/user-not-found':
                    message = 'User not found'
                    break;
                case 'auth/invalid-email':
                    message = 'Invalid Email'
                    break;
                case 'auth/user-disabled':
                    message = 'User blocked! Please contact the admin'
                    break;
                case 'auth/wrong-password':
                    message = 'Wrong password'
                    break;
                default:
                    message = error.message
                    break;
            }
            commit('SET_ERROR', message)
        }
    },
    async signInGoogle({ commit, dispatch }) {
        // Confirm the link is a sign-in with email link.
        // The client SDK will parse the code from the link for you.
        commit('SET_ERROR', '')
        const provider = new authModule.GoogleAuthProvider();
        try {
            await auth.setPersistence(authModule.Auth.Persistence.LOCAL)
            // const signIns = await auth.fetchSignInMethodsForEmail(email)
            // console.log(signIns);
            const result = await auth.signInWithPopup(provider)
            const { ...authUser } = result.user
            commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser })
            dispatch('getCustomClaimRole')

        } catch (error) {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
            console.log('--signin', error);
            switch (error.code) {
                case 'auth/account-exists-with-different-credential':
                    commit('SET_ERROR', 'User exists with different credential')
                    break;
                default:
                    commit('SET_ERROR', error.message)
            }
        }
    },
    signUp({ commit, dispatch }, payload) {
        // Confirm the link is a sign-in with email link.
        // The client SDK will parse the code from the link for you.
        commit('SET_ERROR', '')
        auth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then(async (result) => {
                if (payload.fullname) {
                    await result.user.updateProfile({
                        displayName: payload.fullname
                    })
                }
                const { ...authUser } = result.user
                authUser.displayName = payload.fullname ? payload.fullname : ''
                commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser })
                dispatch('getCustomClaimRole')
            })
            .catch((error) => {
                // Some error occurred, you can inspect the code: error.code
                // Common errors could be invalid email and invalid or expired OTPs.
                console.log('--signin', error);
                let message = ''
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        message = 'Email already in use'
                        break;
                    case 'auth/invalid-email':
                        message = 'Invalid Email'
                        break;
                    case 'auth/operation-not-allowed':
                        message = 'Action blocked! Please contact the admin'
                        break;
                    case 'auth/weak-password':
                        message = 'Please use a stronger password'
                        break;
                    default:
                        message = error.message
                        break;
                }
                commit('SET_ERROR', message)
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

    async resetPassword({ commit }, payload) {
        try {
            commit('SET_ERROR', '')
            await auth.sendPasswordResetEmail(payload.email);
            return 'Email Sent'
        } catch (error) {
            console.log(error);
            let message = ''
            switch (error.code) {
                case 'auth/user-not-found':
                    message = 'Email not found'
                    break;
                case 'auth/invalid-email':
                    message = 'Invalid Email'
                    break;
                default:
                    message = error.message
                    break;
            }
            commit('SET_ERROR', message)
        }
    },
    async verifyPasswordCode(_, payload) {
        try {
            return await auth.verifyPasswordResetCode(payload.code);
        } catch (error) {
            console.log(error);
        }
    },
    async confirmResetPassowrd({ commit }, payload) {
        try {
            commit('SET_ERROR', '')
            await auth.confirmPasswordReset(payload.code, payload.newPassword)
            return 'Password Saved'
        } catch (error) {
            console.log(error);
            let message = ''
            switch (error.code) {
                case 'auth/expired-action-code':
                    message = 'Password code expired. Try again'
                    break;
                case 'auth/invalid-action-code':
                    message = 'Invalid code. Try again'
                    break;
                case 'auth/user-disabled':
                    message = 'User blocked! Please contact the admin'
                    break;
                case 'auth/weak-password':
                    message = 'Please use a strong password'
                    break;
                default:
                    message = error.message
                    break;
            }
            commit('SET_ERROR', message)
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}