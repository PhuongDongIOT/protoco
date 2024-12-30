export abstract class baseInfrastructure<T, V> {
  abstract getAll(): Promise<Array<V>>;
  abstract getById(warehouseId: number): Promise<V>
  abstract create(data: T): Promise<V | undefined>;
}
