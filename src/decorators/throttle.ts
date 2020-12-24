export function Throttle(milissegundos: number = 200) {
  return function (target: any, _: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    let timer: any
    descriptor.value = function (...args: any[]) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        Reflect.apply(originalMethod, target, args)
        timer = null
      }, milissegundos)
    }
  }
}