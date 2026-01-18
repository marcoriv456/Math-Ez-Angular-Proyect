export class Cache<T> {
  private _cache: T | null = null;

  public invalidate() {
    this._cache = null;
  }

  public update(newCache: T) {
    this._cache = newCache;
  }

  public get Cache() {
    return this._cache;
  }
}
