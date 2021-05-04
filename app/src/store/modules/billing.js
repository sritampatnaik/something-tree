import { db, app } from "../../plugins/firebase";
import { STRIPE_PUBLISHABLE_KEY } from "../../plugins/stripe";
import { loadStripe } from "@stripe/stripe-js";

const state = () => ({
    errorMessage: '',
    products: [],
    isProductsLoading: false,
    billingHistory: [],
    isBillingHistoryLoading: false,
})

const mutations = {
    SET_ERROR: (state, message) => {
        state.errorMessage = message
    },
    SET_PRODUCTS: (state, payload) => {
        state.products = payload;
        state.isProductsLoading = false;
    },
    SET_PRODUCTS_LOADING: (state) => {
        state.isProductsLoading = true;
    },
    SET_BILLING_HISTROY: (state, payload) => {
        state.billingHistory = payload,
            state.isBillingHistoryLoading = false
    },
    SET_BILLING_HISTROY_LOADING: (state) => {
        state.isBillingHistoryLoading = true;
    }
}

const actions = {
    async getProducts({ commit }) {
        commit('SET_PRODUCTS_LOADING')
        const { docs } = await db.collection('products')
            .where('active', '==', true)
            .get()
        const product = docs.map(async doc => {
            const { name, description } = doc.data()
            let prod = {
                id: doc.id, name, description
            }
            const priceSnap = await doc.ref.collection('prices').get();
            priceSnap.docs.forEach((doc) => {
                const { currency, interval, unit_amount } = doc.data()
                prod = {
                    ...prod,
                    [`id_${interval}`]: doc.id,
                    [`price_${interval}`]: unit_amount / 100,
                    currency
                }
            });
            return prod
        })
        const val = await Promise.all(product)
        commit('SET_PRODUCTS', val)
    },
    async subscribe({ commit, rootState }, payload) {
        const docRef = await db
            .collection('customers')
            .doc(rootState.auth.authUser.uid)
            .collection('checkout_sessions')
            .add({
                // tax_rates: TAX_RATES,
                allow_promotion_codes: true,
                line_items: [payload.selectedPrice],
                success_url: window.location.origin,
                cancel_url: window.location.origin,
                metadata: {
                    key: 'value',
                },
            });
        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                // Show an error to your customer and then inspect your function logs.
                alert(`An error occured: ${error.message}`);
                commit('SET_ERROR', error.message)
            }
            if (sessionId) {
                // We have a session, let's redirect to Checkout
                // Init Stripe
                const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY)
                stripe.redirectToCheckout({ sessionId });
            }
        });
    },
    async createCustomerPotal() {
        const functionRef = app
            .functions('asia-southeast2')
            .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
        const { data } = await functionRef({ returnUrl: window.location.origin });
        window.location.assign(data.url);
    },
    async getSubscriptions({ rootState, commit }) {
        commit('SET_BILLING_HISTROY_LOADING')
        const { docs } = await db.collection('customers')
            .doc(rootState.auth.authUser.uid)
            .collection('subscriptions')
            .where('status', 'in', ['trialing', 'active'])
            .get()
        const subs = docs.map(async doc => {
            const { created, role, items } = doc.data()
            const sub = {
                id: doc.id,
                created: created.toDate(),
                role,
                amount: new Intl.NumberFormat('en-US', { style: 'currency', currency: items[0].plan.currency }).format(items[0].plan.amount / 100),
                currency: items[0].plan.currency
            }
            const invoiceData = await doc.ref.collection('invoices').where('subscription', '==', doc.id).get()
            if (!invoiceData.empty) {
                sub.invoiceURL = invoiceData.docs[0].data().hosted_invoice_url
            } else sub.invoiceURL = null
            return sub
        })

        const val = await Promise.all(subs)
        commit('SET_BILLING_HISTROY', val)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}