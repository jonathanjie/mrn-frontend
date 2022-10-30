import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        jwt: localStorage.getItem('jwt'),
    }),
    actions: {
        async updateUserAndToken() {
            const { user, getAccessTokenSilently } = useAuth0()
            
            const jwt = await getAccessTokenSilently();

            this.user = user;
            this.jwt = jwt

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('jwt', JSON.stringify(jwt));

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