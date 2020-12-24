export function MinValue(minValue: number) {
  return (target: any, prop: PropertyKey) => {
    let value = target[prop]
    return Object.defineProperty(target, prop, {
      get() {
        return value
      },
      set(newValue: number) {
        if (newValue < minValue) throw new Error(`O valor é menor que o valor mínimo: ${minValue}`)
        value = newValue
      }
    })
  }
}