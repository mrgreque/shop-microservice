import { IProxy } from '../../domain/proxy/proxy';
import {
  CreateEstabilishment,
  GetEstabilishments,
} from '../../usecases/establishment';
import { MongoDbHelper } from '../helpers';
import { Db } from '../providers/db-mongo';
import { EstabilishmentRepository } from '../repositories/db-estabilishment.repository';

export interface EstabilishmentProxy {
  createEstabilishment: CreateEstabilishment;
  getEstabilishments: GetEstabilishments;
}

class UseCaseProxy implements IProxy {
  estabilishmentProxy(): EstabilishmentProxy {
    const mongoProvider = new Db();
    const estabilishmentRepository = new EstabilishmentRepository();
    const mongoDbHelper = new MongoDbHelper();

    const createEstabilishment = new CreateEstabilishment(
      estabilishmentRepository,
      mongoProvider,
    );

    const getEstabilishments = new GetEstabilishments(
      estabilishmentRepository,
      mongoProvider,
      mongoDbHelper,
    );

    return {
      createEstabilishment,
      getEstabilishments,
    };
  }
}

export { UseCaseProxy };
