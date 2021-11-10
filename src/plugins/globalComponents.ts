import { camelCase, upperFirst } from 'lodash-es'
import { App } from "vue";

const components = import.meta.globEager('../components/**/(Base|Icon)*.(vue|js)')

/**
 * This will require and make global all components starting with **Base** (e.g BaseButton, BaseInput etc) or **Icon** (e.g IconPhone)
 */
export default {
  install(Vue: App) {

    for (let filePath in components) {
      // @ts-ignore
      const componentPath = filePath
        .split('/')
        .pop()
        .replace(/\.\w+$/, '') 
      
      const componentName = upperFirst(camelCase(componentPath))
      const componentConfig = components[filePath]
      // Register component globally
      Vue.component(
        componentName,
        // Look for the component options on `.default`, which will
        // exist if the component was exported with `export default`,
        // otherwise fall back to module's root.
        componentConfig.default || componentConfig
      )
    }
  }
}

