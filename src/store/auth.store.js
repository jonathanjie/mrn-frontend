import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        jwt: localStorage.getItem('jwt'),
    }),
    actions: {
        updateUserAndToken(user, token) {
            this.user = user;
            this.jwt = token;

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('jwt', JSON.stringify(token));

            console.log("USER: ", JSON.parse(localStorage.getItem('user')));
            console.log("TOKEN: ", localStorage.getItem('jwt'));
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