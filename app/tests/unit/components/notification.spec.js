import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import Notification from '@/components/loggedIn/Notification';

describe('Notification.vue testing', () => {

    let store;
    let state = {
        activeNotifications: [],
        profile: null,
    }
    beforeEach(() => {
        store = createStore({
            modules: {
                profile: {
                    state: state,
                    actions: {
                        notificationsListener: jest.fn(),
                        getProfile: jest.fn(),
                        setNotificationStatusAsRead: jest.fn()
                    },
                    mutations: {
                        ON_NOTIFICATION_CHANGE: jest.fn(),
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

    test('Rendering Click on Notification', async () => {

        const wrapper = mount(Notification, {
            global: {
                plugins: [store],
                stubs: ['RouterLink']
            },
        })

        await wrapper.findComponent({ ref: 'notification-btn' }).trigger('click')
        expect(wrapper.text()).toMatch('NOTIFICATIONS')
    })

    test('Checking the red dot functions', () => {

        state.profile = {
            status: 'unseen'
        }
        const wrapper = mount(Notification, {
            global: {
                plugins: [store],
                stubs: ['RouterLink']
            },
        })

        expect(wrapper.find('#notification-red-dot').exists()).toBeTruthy()
    })

    test('Create notification and reading it', async () => {

        const date = new Date('5/1/2021')
        state.activeNotifications = [{
            title: 'Test',
            createTime: new Object({
                toDate() {
                    return date
                }
            }),
            content: 'Test Content'
        }]
        const wrapper = mount(Notification, {
            global: {
                plugins: [store],
                stubs: ['RouterLink']
            },
        })

        await wrapper.findComponent({ ref: 'notification-btn' }).trigger('click')
        expect(wrapper.text()).toMatch('Test')
    })
})