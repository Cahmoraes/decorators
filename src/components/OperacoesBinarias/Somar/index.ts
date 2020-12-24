import template from './index.html'
import './styles'

import { DOMInject } from '../../../decorators/DOMInject';
import { Throttle } from '../../../decorators/throttle';
import { InjectNumber } from '../../../decorators/injectValue';
import { LogExecutionTime } from '../../../decorators/logExecutionTime';
import { OperacaoBinaria } from '..';
import { IInit } from '../../../interfaces/IInit';
import IEventsHandler from '../../../interface/IEventsHandler';

export default class Somar extends OperacaoBinaria<string> implements IInit<Somar>, IEventsHandler {

  @DOMInject('#somar_1')
  private _input_1: HTMLInputElement

  @DOMInject('#somar_2')
  private _input_2: HTMLInputElement

  @DOMInject('#resultado_soma')
  private _result: HTMLElement

  @InjectNumber()
  private _number_1: number

  @InjectNumber()
  private _number_2: number

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

  @LogExecutionTime
  checkValues() {
    if (!isNaN(this._number_1) && !isNaN(this._number_2)) {
      this._result.innerText = this.execute()
    }
  }

  execute(): string {
    return String(this._number_1 + this._number_2)
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

  addEventInputs() {
    this._input_1.addEventListener('keyup', this.handleKeyUp.bind(this, this._input_1))
    this._input_2.addEventListener('keyup', this.handleKeyUp.bind(this, this._input_2))

    this._input_1.addEventListener('blur', this.handleBlur.bind(this))
    this._input_2.addEventListener('blur', this.handleBlur.bind(this))
  }

  init() {
    this.render({ title: 'Somar:', operation: '+' }, template)
    this.addEventInputs()
    this.checkValues()
    return this
  }
}