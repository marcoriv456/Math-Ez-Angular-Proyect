import { Link } from '../../../../../core/structures/link/link.i';

export class LinkStringifier {
  public static ToString<T>(
    link: Link<T>,
    mapper: (el: T | null) => string | null,
  ): string {
    return `${mapper(link.Prev?.Value || null)} -> ${mapper(link.Value)} -> ${mapper(link.Next?.Value || null)}`;
  }
}
