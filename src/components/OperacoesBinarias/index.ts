import ITemplateOperacaoBinaria from '../../interface/ITemplateOperacaoBinaria';
import { DOMInject } from '../../decorators/DOMInject';

export abstract class OperacaoBinaria<T> {

  @DOMInject('#root')
  private _root: HTMLElement

  abstract execute(): T

  protected addEventInputs() { }

  protected checkValues() { }

  protected render(config: ITemplateOperacaoBinaria, template: Function): void {
    this._root.insertAdjacentHTML('beforeend', template(config))
  }
}