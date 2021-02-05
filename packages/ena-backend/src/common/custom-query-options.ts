import { SelectQueryBuilder } from 'typeorm';

export interface ICustomQueryOptions {
  skip?: number;
  take?: number;
}

export function setCustomQueryOptions<T>(
  query: SelectQueryBuilder<T>,
  options: ICustomQueryOptions,
): SelectQueryBuilder<T> {
  if (!options) {
    return query;
  }
  if (options.skip) {
    query.skip(options.skip);
  }
  if (options.take) {
    query.take(options.take);
  }

  return query;
}
