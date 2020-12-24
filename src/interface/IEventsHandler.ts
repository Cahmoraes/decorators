export default interface IEventsHandler {
  handleKeyUp(input: HTMLInputElement): void
  handleBlur(): void
}