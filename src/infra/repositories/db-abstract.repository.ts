import { Connection, isValidObjectId } from 'mongoose';
import { QueryParams } from '../dtos';
import { IAbstractRepository } from '../../domain/repositories';

export class DbAbstractRepository<T> implements IAbstractRepository<T> {
  public async create(
    data: object,
    dbConn: Connection,
    collection_name: string,
  ): Promise<void> {
    const collection = dbConn.collection(collection_name);
    await collection.insertOne(data);
  }

  public async update(
    _id: string,
    data: object,
    dbConn: Connection,
    collection_name: string,
  ): Promise<void> {
    const collection = dbConn.collection(collection_name);
    await collection.updateOne(
      { _id: isValidObjectId(_id) ? _id : null },
      { $set: data },
    );
  }

  public async delete(
    _id: string,
    dbConn: Connection,
    collection_name: string,
  ): Promise<void> {
    const collection = dbConn.collection(collection_name);
    await collection.updateOne(
      { _id: isValidObjectId(_id) ? _id : null },
      { $set: { active: false, inactivatedAt: new Date() } },
    );
  }

  public async findById(
    _id: string,
    dbConn: Connection,
    collection_name: string,
  ): Promise<T> {
    const collection = dbConn.collection(collection_name);
    return (await collection.findOne({
      _id: isValidObjectId(_id) ? _id : null,
    })) as T;
  }

  public async findAll(
    query: object,
    queryParams: QueryParams,
    dbConn: Connection,
    collection_name: string,
  ): Promise<T[]> {
    const collection = dbConn.collection(collection_name);
    return (await collection.find(query, queryParams).toArray()) as T[];
  }

  public async countDocuments(
    query: object,
    queryParams: QueryParams,
    dbConn: Connection,
    collection_name: string,
  ): Promise<number> {
    const collection = dbConn.collection(collection_name);
    return await collection.find(query, queryParams).count();
  }
}
