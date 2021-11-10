import { PageDirOptions, Route } from "vite-plugin-pages";

/**
 * Tries to get the folder name of the module from the path
 * @param path
 */
function getModuleName(path: string): string {
  const parts = path.split('/')
  if (path.includes('modules')) {
    const modulesIndex: number = parts.indexOf('modules')
    return parts[modulesIndex + 1] || ''
  }
  return ''
}


/**
 * Adds a prefix to the page path based on the module folder.
 * @param route
 */
export function extendRoute(route: Route): Route | void {
  const moduleName: string = getModuleName(route.component)
  if (moduleName) {
    route.path = `/${moduleName}${route.path}`
  }
  return {
    ...route,
  };
}

export const pagesDir: Array<PageDirOptions> = [
  {
    dir: "src/pages",
    baseRoute: ""
  },
  {
    dir: "src/modules/**/**/pages",
    baseRoute: ""
  }
]
