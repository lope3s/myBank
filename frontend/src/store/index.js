import { createStore } from "easy-peasy";
import { action } from "easy-peasy";

const store = createStore({
  name: "test",
  isLogged: false,
  isChanging: true,
  activeServerModal: {activate: false, message: '', status: false},
  toggle: action((state, payload) => {
    state.isLogged = payload
  }),
  toggleStatus: action((state, payload) => {
    state.isChanging = payload
  }),
  setActiveServerModal: action((state, payload) => {
    state.activeServerModal = payload
  }),
});

export default store;
