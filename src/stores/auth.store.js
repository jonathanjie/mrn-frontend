import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    role: localStorage.getItem("role"),
    jwt: localStorage.getItem("jwt"),
  }),
  actions: {
    updateUserRoleToken(user, role, token) {
      this.updateUser(user);
      this.updateRole(role);
      this.updateToken(token);
    },
    updateToken(token) {
      this.jwt = token;
      localStorage.setItem("jwt", token);
      console.log("TOKEN: ", localStorage.getItem("jwt"));
    },
    updateUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    updateRole(role) {
      this.role = role;
      localStorage.setItem("role", role);
    },
    logout() {
      this.user = null;
      this.jwt = null;
      this.role = null;

      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");
      console.log(localStorage.getItem("role"));
      // logout({ returnTo: window.location.origin });
      // router.push('/login'); TODO: uncomment when login page is ready
    },
  },
});
