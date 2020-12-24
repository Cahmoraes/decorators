import { DOMInject } from '../decorators/DOMInject';
import { Throttle } from '../decorators/throttle';

function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}

export class Controller {

  @DOMInject('#inputValue')
  private inputController: HTMLInputElement

  constructor() {
    this.addEventKeyUp()
  }

  addEventKeyUp() {
    this.inputController.addEventListener('keyup', this.handleKeyUp.bind(this))
  }

  @Throttle(500)
  handleKeyUp(event: KeyboardEvent) {
    console.log((event.target as HTMLInputElement).value)
  }

}