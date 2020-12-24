export function LogExecutionTime(target: any, _: PropertyKey, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  descriptor.value = function (...args: any[]) {
    const start = window.performance.now()
    const result = Reflect.apply(originalMethod, target, args)
    const end = window.performance.now()
    console.log(`timer: ${((end - start).toFixed(3))}s`)
    return result
  }
}