interface Store {
  user: string | null;
  token: string | null;
  avat: string | null;
}

export default {
  state() {
    return {
      user: localStorage.getItem("user") || null,
      token: localStorage.getItem("token") || null,
      avat: localStorage.getItem("avat") || null,
    };
  },
  mutations: {
    GET_USER(state: Store) {
      return state.user;
    },
    SET_USER(state: Store, name: string) {
      state.user = name;
      localStorage.setItem("user", name);
    },
    GET_TOKEN(state: Store) {
      return state.token;
    },
    SET_TOKEN(state: Store, token: string) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    LOGOUT_STORE(state: Store) {
      state.user = null;
      state.token = null;
      state.avat = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("avat");
    },
    SET_AVAT(state: Store, avat: string) {
      state.avat = avat;
      localStorage.setItem("avat", avat);
    },
    GET_AVAT(state: Store) {
      return state.avat;
    },
  },
};
