export function focusOnElement(selector: string, componentEl: HTMLElement | any) {
  let element
  if (!componentEl) {
    element = document.querySelector(selector)
  } else {
    element = componentEl.querySelector(selector)
  }
  if (!element) {
    return
  }
  element?.focus()
}
