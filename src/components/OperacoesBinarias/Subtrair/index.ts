import template from './index.html'

import { OperacaoBinaria } from '..';
import { IInit } from '../../../interfaces/IInit';
import { DOMInject } from '../../../decorators/DOMInject';
import { InjectNumber } from '../../../decorators/injectValue';
import { Throttle } from '../../../decorators/throttle';
import IEventsHandler from '../../../interface/IEventsHandler';

export class Subtrair extends OperacaoBinaria<string> implements IInit<Subtrair>, IEventsHandler {

  @DOMInject('#subtrair_1')
  private _input_1: HTMLInputElement

  @DOMInject('#subtrair_2')
  private _input_2: HTMLInputElement

  @DOMInject('#resultado_subtrair')
  private _result: HTMLElement

  @InjectNumber()
  private _number_1: number

  @InjectNumber()
  private _number_2: number

  constructor() {
    super()
  }

  execute(): string {
    return String(this._number_1 - this._number_2)
  }

  get number_1(): number {
    return this._number_1
  }

  set number_1(value: number) {
    if (typeof parseFloat(value as unknown as string) === 'number') this._number_1 = value
  }

  get number_2(): number {
    return this._number_2
  }

  set number_2(value: number) {
    if (typeof parseFloat(value as unknown as string) === 'number') this._number_2 = value
  }

  @Throttle(300)
  handleKeyUp(input: HTMLInputElement): void {
    if (input === this._input_1) {
      this.number_1 = parseFloat(input.value)
    } else {
      this.number_2 = parseFloat(input.value)
    }
    this.checkValues()
  }

  handleBlur() {
    this.checkValues()
  }

  checkValues() {
    if (!isNaN(this._number_1) && !isNaN(this._number_2)) {
      this._result.innerText = this.execute()
    }
  }

  addEventInputs() {
    this._input_1.addEventListener('keyup', this.handleKeyUp.bind(this, this._input_1))
    this._input_2.addEventListener('keyup', this.handleKeyUp.bind(this, this._input_2))

    this._input_1.addEventListener('blur', this.handleBlur.bind(this))
    this._input_2.addEventListener('blur', this.handleBlur.bind(this))
  }

  init() {
    this.render({ title: 'Subtrair:', operation: '-' }, template)
    this.addEventInputs()
    this.checkValues()
    return this
  }
}