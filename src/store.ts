import { Module, Store } from 'vuex'
import { createStore } from 'vuex-extensions'
import createPersistedState from "vuex-persistedstate";
import { State as AuthState } from "@/modules/auth/store/authModule";

export type RootState = {
  auth: AuthState
};

interface Modules {
  [key: string]: Module<object, RootState>;
}

function getStoreModules() {
  const files = import.meta.globEager('./modules/**/store/*Module.ts')
  const fileKeys: Array<string> = Object.keys(files)
  const modules: Modules = {}
  fileKeys.forEach(key => {
    if (!files[key]) {
      return
    }

    const storeModule = files[key].default
    const pathParts: Array<string> = key.split('/')
    const fileName: string = pathParts[pathParts.length - 1]
    const moduleName: string = fileName.replace('Module.ts', '')
    if (storeModule) {
      modules[moduleName] = storeModule
    }
  })
  return modules
}

export default createStore(Store, {
  plugins: [
    createPersistedState({
      paths: ['auth']
    })
  ],
  modules: {
    ...getStoreModules()
  }
})
