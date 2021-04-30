import { db } from "../../plugins/firebase";
import { TAX_RATES, STRIPE_PUBLISHABLE_KEY } from "../../plugins/stripe";

const state = () => ({
    subscription: '',
    selectedPlan: null,
    isPaid: false,
    errorMessage: ''
})

const mutations = {
    SET_ERROR: (state, message) => {
        state.errorMessage = message
    }
}

const actions = {
    async subscribe({ commit, rootState }, payload) {
        const docRef = await db
            .collection('customers')
            .doc(rootState.auth.authUser.uid)
            .collection('checkout_sessions')
            .add({
                tax_rates: TAX_RATES,
                allow_promotion_codes: true,
                line_items: [payload.selectedPrice],
                success_url: window.location.origin,
                cancel_url: window.location.origin,
                metadata: {
                    key: 'value',
                },
            });
        docRef.onSnapshot((snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                // Show an error to your customer and then inspect your function logs.
                alert(`An error occured: ${error.message}`);
                commit('SET_ERROR', error.message)
            }
            if (sessionId) {
                // We have a session, let's redirect to Checkout
                // Init Stripe
                const stripe = window.Stripe(STRIPE_PUBLISHABLE_KEY)
                stripe.redirectToCheckout({ sessionId });
            }
        });
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}