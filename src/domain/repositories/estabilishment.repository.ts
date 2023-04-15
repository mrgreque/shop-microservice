/* eslint-disable no-unused-vars */
import { Connection } from 'mongoose';
import { IAbstractRepository } from './abstract.repository';

export interface IEstabilishmentRepository<T> extends IAbstractRepository<T> {
  findByCnpj(
    cnpj: string,
    dbConn: Connection,
    collection_name: string,
  ): Promise<T>;
}
