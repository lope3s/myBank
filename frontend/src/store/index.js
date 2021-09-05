import { createStore } from "easy-peasy";
import { action } from "easy-peasy";
import model from "./model";

const store = createStore({
  name: "test",
  isLogged: false,
  toggle: action((state, isLogged) => {
    console.log(state.isLogged);
    state.isLogged = !state.isLogged;
  }),
});

export default store;
