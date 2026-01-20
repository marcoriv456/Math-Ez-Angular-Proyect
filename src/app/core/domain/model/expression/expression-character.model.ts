import { Link } from '../../../structures/link/link.i';
import { Expression } from './expression.model';

export interface Character {
  readonly Character: string;
  readonly Link: Link<Character>;
  readonly ParentExpression: Expression;
}
