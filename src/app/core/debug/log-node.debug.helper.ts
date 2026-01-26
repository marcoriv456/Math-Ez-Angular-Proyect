import { ExpressionNode } from '../domain/abstract/expression-node.interface';
import { Character } from '../domain/model/character/character.model';
import { Expression } from '../domain/model/expression/expression.model';
import { Fraction } from '../domain/model/fraction/fraction.model';
import { Link } from '../structures/link/link.i';
import { SelectionLinker } from '../structures/link/selection-linker.structure';

const config = {
  log: true,
};

export function Log(linker: SelectionLinker<ExpressionNode>) {
  if (config.log) LogNode(linker.Selection);
}

export function LogNode(node: Link<ExpressionNode> | null) {
  if (!node) console.log('null');
  else
    console.log(
      `${Stringify(node.Prev?.Value)} -> ${Stringify(node.Value)} -> ${Stringify(node.Next?.Value)}`,
    );
}

const Stringify = (node?: ExpressionNode | null): string => {
  if (node instanceof Character) return node.Character;
  if (node instanceof Fraction)
    return `frac(${StringifyExpression(node.Numerator)} / ${StringifyExpression(node.Denominator)})`;
  return 'null';
};

const StringifyExpression = (exp: Expression) => {
  return exp.AsArray.map((n) => Stringify(n));
};
