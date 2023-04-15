import { Pagination, QueryParams } from '../../infra/dtos';

export interface IMongoDbHelper {
  // eslint-disable-next-line no-unused-vars
  buildQueryParams(filters: Pagination): QueryParams;
}
