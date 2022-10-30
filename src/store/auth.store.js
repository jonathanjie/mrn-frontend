import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        jwt: localStorage.getItem('jwt'),
    }),
    actions: {
        updateUserAndToken(user, token) {
            this.updateUser(user)
            this.updateToken(token)
        },
        updateToken(token) {
            this.jwt = token;
            localStorage.setItem('jwt', JSON.stringify(token));
            console.log("TOKEN: ", localStorage.getItem('jwt'));
        },
        updateUser(user) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            console.log("USER: ", JSON.parse(localStorage.getItem('user')));
        },
        logout() {
            this.user = null;
            this.jwt = null;

            localStorage.removeItem('user');
            localStorage.removeItem('jwt');

            // router.push('/login'); TODO: uncomment when login page is ready
        }
    },
});