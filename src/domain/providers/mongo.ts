import { Connection } from 'mongoose';

export interface IMongoProvider {
  getConnection(): Promise<Connection>;
  getManagerConnection(): Promise<Connection>;
  // eslint-disable-next-line no-unused-vars
  getTenatConnection(db_name: string): Promise<Connection>;
}
