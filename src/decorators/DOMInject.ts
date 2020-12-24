export function DOMInject(selector: string, list: boolean = false) {
  return (target: any, prop: PropertyKey) => {
    let element: HTMLElement | NodeListOf<HTMLElement>
    return Object.defineProperty(target, prop, {
      get() {
        if (!element && !list) element = document.querySelector(selector) as HTMLElement
        else if (!element && list) element = document.querySelectorAll(selector)
        return element
      }
    })
  }
}