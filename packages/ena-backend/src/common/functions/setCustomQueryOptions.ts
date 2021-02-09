import { SelectQueryBuilder } from 'typeorm';
import { ICustomQueryOptions } from '../interfaces/customQueryOptions.interface';

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
