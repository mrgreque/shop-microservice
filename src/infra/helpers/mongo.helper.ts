import { IMongoDbHelper } from '../../domain/helpers';
import { Pagination, QueryParams } from '../dtos';

export class MongoDbHelper implements IMongoDbHelper {
  buildQueryParams(filters: Pagination): QueryParams {
    const { page, pageSize } = filters;
    const queryParams = {
      skip: page && pageSize && page > 0 ? (page - 1) * pageSize : 0,
      limit: pageSize && pageSize > 0 ? pageSize : 0,
    };

    return queryParams;
  }
}
