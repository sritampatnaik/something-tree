import { db, app } from "../../plugins/firebase";
import { loadStripe } from "@stripe/stripe-js";

const state = () => ({
    errorMessage: '',
    products: [],
    isProductsLoading: false,
    billingHistory: [],
    isBillingHistoryLoading: false,
    subs: null,
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
    },
    SET_SUBSCRIPTION(state, payload) {
        state.subs = payload
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
                success_url: `${window.location.origin}/#/settings/billing`,
                cancel_url: `${window.location.origin}/#/settings/billing`,
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
                const stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY)
                stripe.redirectToCheckout({ sessionId });
            }
        });
    },
    async createCustomerPotal() {
        const functionRef = app
            .functions('asia-southeast2')
            .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
        const { data } = await functionRef({ returnUrl: `${window.location.origin}/#/settings/billing` });
        window.location.assign(data.url);
    },
    async getBillingHistory({ rootState, commit }) {
        commit('SET_BILLING_HISTROY_LOADING')
        const docs = await db.collection('customers')
            .doc(rootState.auth.authUser.uid)
            .collection('subscriptions')
            // .where('status', 'in', ['trialing', 'active'])
            .get()
        if (!docs.empty) {
            const subs = docs.docs.map(async doc => {
                const invoiceData = await doc.ref.collection('invoices').get()
                if (!invoiceData.empty) {
                    const bill = invoiceData.docs.map(doc => {
                        const { amount_paid, currency, number, created, hosted_invoice_url } = doc.data()
                        return {
                            id: doc.id,
                            created: new Date(created * 1000),
                            invoice_id: number,
                            amount: new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount_paid / 100),
                            invoiceURL: hosted_invoice_url
                        }
                    })
                    return bill
                }
            })
            const val = await Promise.all(subs)
            commit('SET_BILLING_HISTROY', val.flat().sort((a, b) => b.created - a.created))
        } else {
            commit('SET_BILLING_HISTROY', null)
        }

    },
    getCustomerSubs({ rootState, commit }) {
        db.collection('customers')
            .doc(rootState.auth.authUser.uid)
            .collection('subscriptions')
            .where('status', 'in', ['trialing', 'active'])
            .onSnapshot(async (snapshot) => {
                // In this implementation we only expect one active or trialing subscription to exist.
                const doc = snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        // console.log("New city: ", change.doc.data());
                        const { items, role } = change.doc.data()
                        console.log('--subs-changes-added', items, role);
                    }
                    if (change.type === "modified") {
                        // console.log("Modified city: ", change.doc.data());
                        const { items, role } = change.doc.data()
                        console.log('--subs-changes-modified', items, role);
                    }
                });
                commit('SET_SUBSCRIPTION', doc)
            });
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}