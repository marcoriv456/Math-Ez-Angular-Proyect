import { Link } from './link.i';
import { SelectionLinker } from './selection-linker.structure';

export class ClosedLinker<T> extends SelectionLinker<T> {
  constructor(elements: T[]) {
    super();
    if (elements.length == 0)
      throw new Error('A closed linker must at least have two elements.');
    for (const el of elements) {
      super.Add(el);
    }
  }
  override Add(): Link<T> {
    throw new Error('No new elements can be added to a closed linker.');
  }
  override Remove(): Link<T> {
    throw new Error('Cant remove elements from a closed linker.');
  }
  override SelectTail() {
    throw new Error("A closed linker doesn't have placeholders (No tail).");
  }

  SelectFirst() {
    const first = this.first();
    if (!first) throw new Error('No first element found.');
    this.Select(first);
  }
}
