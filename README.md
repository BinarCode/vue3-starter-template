# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 SFCs.

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type
by default. In most cases this is fine if you don't really care about component prop types outside of templates.
However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using
manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off`
from VSCode command palette.

## VSCode Setup

- [VSCode](https://code.visualstudio.com/)
  + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Project structure

The project is structured with modules, inspired by [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)
A module represents a directory containing all the code for a specific feature including pages, feature specific components, store and other things.
An example of a module is the `auth` module which can host everything related to authentication such as login, register, reset, forgot password etc.

## Project specific tools & libraries
- [Vite](https://vitejs.dev/) Is used as a dev server & build tool.
- [Vue Router](https://router.vuejs.org/) Is used for routing.
- [Vite Plugin Routes](https://github.com/hannoeru/vite-plugin-pages) is used to automatically generate routes.
- [Pinia](https://pinia.vuejs.org/) is used for state management.
- [Vue I18n](https://vue-i18n.intlify.dev/introduction.html) is used for translations.
- [Axios](https://github.com/axios/axios) is used for making requests. There are some interceptors already defined in `src/modules/common/apiConfig.ts`
- [TailwindCSS](https://tailwindcss.com/) is used for styling. You can extend the config in `tailwind.config.js`.
- **Base** components. All components starting with **Base** will be automatically imported and therefore there's no need to reimport them in each component.
You can check how it's done in `src/plugins/globalComponents.ts`
- You can find several plugins and utilities inside `src/plugins` folder.
  - `this.$copyToClipboard(message)` can be used to copy to clipboard
  - `this.$formatDate(date, format)` can be used to format dates
  - `this.$success(message)` or `this.$error(message)` can be used to trigger notifications across the app both in components and code.

