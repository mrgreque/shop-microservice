import { Connection } from 'mongoose';
import { QueryParams } from '../../infra/dtos';

/* eslint-disable no-unused-vars */
export interface IAbstractRepository<T> {
  create(
    data: object,
    dbConn: Connection,
    collection_name: string,
  ): Promise<void>;
  update(
    _id: string,
    data: object,
    dbConn: Connection,
    collection_name: string,
  ): Promise<void>;
  delete(
    _id: string,
    dbConn: Connection,
    collection_name: string,
  ): Promise<void>;
  findById(
    _id: string,
    dbConn: Connection,
    collection_name: string,
  ): Promise<T>;
  findAll(
    query: object,
    queryParams: QueryParams,
    dbConn: Connection,
    collection_name: string,
  ): Promise<T[]>;
  countDocuments(
    query: object,
    queryParams: QueryParams,
    dbConn: Connection,
    collection_name: string,
  ): Promise<number>;
}
