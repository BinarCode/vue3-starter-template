// vuex.d.ts
import { Store } from 'vuex'
import { RootState } from "@/store";

declare module '@vue/runtime-core' {
  // declare your own store states
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<RootState>
  }
}
