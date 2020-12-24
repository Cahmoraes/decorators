export function InjectNumber(injectNum?: number) {
  return (target: any, prop: PropertyKey) => {
    let value = target[prop]
    return Object.defineProperty(target, prop, {
      get(): number {
        return value || injectNum || 0
      },
      set(newValue: number) {
        if (typeof parseFloat(newValue as unknown as string) === 'number') value = newValue
        else value = 0
      },
      configurable: true
    })
  }
}