import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isLoggedIn: false as boolean,
    }
  },
  actions: {
    setLoggedIn(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn
    },
  },
})
