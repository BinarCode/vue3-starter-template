import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { RootState } from "@/store";

export type State = {
  isLoggedIn: boolean;
}

export const state = (): State => ({
  isLoggedIn: false,
})

const mutations: MutationTree<State> = {
  setLoggedIn(state: State, isLoggedIn: boolean) {
    state.isLoggedIn = isLoggedIn;
  },
}

const actions: ActionTree<State, RootState> = {}

const getters: GetterTree<State, RootState> = {}

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default module;
