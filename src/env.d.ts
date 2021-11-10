/// <reference types="vite/client" />
import { DefineComponent } from 'vue'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $refs: {
      [key: string]: HTMLElement|any,
    },
  }
}

declare module '*.vue' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
