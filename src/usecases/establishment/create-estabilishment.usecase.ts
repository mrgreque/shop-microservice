import { IMongoProvider } from '../../domain/providers/mongo';
import { IEstabilishmentRepository } from '../../domain/repositories';
import { DefaultResponse } from '../../infra/dtos';
import {
  EstabilishmentInput,
  EstabilishmentObject,
} from '../../infra/dtos/estabilishment.dto';

export class CreateEstabilishment {
  public estabilishmentRepository: IEstabilishmentRepository<EstabilishmentObject>;
  public mongoProvider: IMongoProvider;

  constructor(
    estabilishmentRepository: IEstabilishmentRepository<EstabilishmentObject>,
    mongoProvider: IMongoProvider,
  ) {
    this.estabilishmentRepository = estabilishmentRepository;
    this.mongoProvider = mongoProvider;
  }

  async execute(estabilishment: EstabilishmentInput): Promise<DefaultResponse> {
    try {
      const dbConn = await this.mongoProvider.getManagerConnection();

      const estabilishmentExists =
        await this.estabilishmentRepository.findByCnpj(
          estabilishment.cnpj,
          dbConn,
          'estabilishments',
        );

      if (estabilishmentExists)
        throw new Error('Estabilishment already exists');

      const acronyum_name = (estabilishment.name as string)
        .split(' ')
        .join('_')
        .toLowerCase();

      const full_acronyum = `${acronyum_name}_${
        estabilishment.cnpj
      }_${estabilishment.type.toLowerCase()}`;

      const estabilishmentInsert = {
        ...estabilishment,
        channels: {
          database: {
            acronyum: full_acronyum,
          },
        },
      };

      await this.estabilishmentRepository.create(
        estabilishmentInsert,
        dbConn,
        'estabilishments',
      );

      console.log(full_acronyum);

      const tenant = await this.mongoProvider.getTenatConnection(full_acronyum);
      await tenant.collection('default').insertOne({
        name: acronyum_name,
        acronyum: full_acronyum,
        created_at: new Date(),
      });

      return {
        success: true,
        message: 'Estabilishment created successfully',
      };
    } catch (error) {
      throw new Error(`Error on create estabilishment: ${error}`);
    }
  }
}
