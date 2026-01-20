export interface Link<T> {
  readonly Next: Link<T> | null;
  readonly Prev: Link<T> | null;
  readonly Index: number;
  readonly Value: T;
}
