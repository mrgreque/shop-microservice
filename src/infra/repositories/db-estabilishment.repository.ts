import { Connection } from 'mongoose';
import { IEstabilishmentRepository } from '../../domain/repositories';
import { EstabilishmentObject } from '../dtos/estabilishment.dto';
import { DbAbstractRepository } from './db-abstract.repository';

export class EstabilishmentRepository
  extends DbAbstractRepository<EstabilishmentObject>
  implements IEstabilishmentRepository<EstabilishmentObject>
{
  async findByCnpj(
    cnpj: string,
    dbConn: Connection,
    collection_name: string,
  ): Promise<EstabilishmentObject> {
    const collection = dbConn.collection(collection_name);
    return await collection.findOne<Promise<EstabilishmentObject>>({ cnpj });
  }
}
