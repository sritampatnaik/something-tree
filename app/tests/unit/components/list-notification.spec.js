import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ListNotifications from '@/components/loggedIn/ListNotifications'

describe('ListNotification.vue testing', () => {
    let store;
    let state = {
        allNotifications: [],
        isAllNotificationsLoading: false,
    }

    beforeEach(() => {
        store = createStore({
            modules: {
                profile: {
                    state: state,
                    actions: {
                        getAllNotification: jest.fn(),
                        getProfile: jest.fn(),
                        setNotificationStatusAsRead: jest.fn()
                    },
                    mutations: {
                        GET_ALL_NOTIFICATIONS: jest.fn(),
                        SET_ALL_NOTIFICATIONS: jest.fn()
                    },
                    getters: {
                        status(state) {
                            return state.profile ? state.profile.status : null
                        }
                    },
                    namespaced: true
                }
            }
        })

    })

    test('Rendering on ListNotification', async () => {

        const wrapper = mount(ListNotifications, {
            global: {
                plugins: [store],
            },
        })
        expect(wrapper.text()).toMatch('Notifications')
    })

    test('Rendering empty table on ListNotification', async () => {

        const wrapper = mount(ListNotifications, {
            global: {
                plugins: [store],
            },
        })
        expect(wrapper.text()).toMatch('Id')
    })

    test('Rendering some data on table of ListNotification', async () => {

        const date = new Date('5/1/2021')
        state.allNotifications = [{
            id: 'N001',
            title: 'Test',
            createTime: new Object({
                toDate() {
                    return date
                }
            }),
            content: 'Test Content'
        }]

        const wrapper = mount(ListNotifications, {
            global: {
                plugins: [store],
            },
        })
        expect(wrapper.text()).toMatch('N001')
    })

})