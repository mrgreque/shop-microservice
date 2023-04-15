import { IMongoProvider } from '../../domain/providers/mongo';
import { IEstabilishmentRepository } from '../../domain/repositories';
import { Pagination } from '../../infra/dtos';
import {
  EstabilishmentObject,
  EstabilishmentResponse,
} from '../../infra/dtos/estabilishment.dto';
import { MongoDbHelper } from '../../infra/helpers';

export class GetEstabilishments {
  public estabilishmentRepository: IEstabilishmentRepository<EstabilishmentObject>;
  public mongoProvider: IMongoProvider;
  public mongoDbHelper: MongoDbHelper;

  constructor(
    estabilishmentRepository: IEstabilishmentRepository<EstabilishmentObject>,
    mongoProvider: IMongoProvider,
    mongoDbHelper: MongoDbHelper,
  ) {
    this.estabilishmentRepository = estabilishmentRepository;
    this.mongoProvider = mongoProvider;
    this.mongoDbHelper = mongoDbHelper;
  }

  async execute(pagination: Pagination): Promise<EstabilishmentResponse> {
    const { search } = pagination;

    const query = {};
    if (search) {
      query['$or'] = [
        { name: { $regex: search, $options: 'i' } },
        { cnpj: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } },
      ];
    }

    const queryParams = this.mongoDbHelper.buildQueryParams(pagination);

    const dbConn = await this.mongoProvider.getManagerConnection();

    const [estabilishments, total] = await Promise.all([
      this.estabilishmentRepository.findAll(
        query,
        queryParams,
        dbConn,
        'estabilishments',
      ),
      this.estabilishmentRepository.countDocuments(
        query,
        queryParams,
        dbConn,
        'estabilishments',
      ),
    ]);

    return {
      estabilishments,
      total,
    };
  }
}
