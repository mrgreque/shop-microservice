import mongoose, { Connection } from 'mongoose';
import { IMongoProvider } from '../../domain/providers/mongo';
import { config } from 'dotenv';

config();

export class Db implements IMongoProvider {
  async getConnection(): Promise<Connection> {
    const dbConn = mongoose.createConnection();
    return dbConn.openUri(process.env.MONGO_URL, {});
  }

  async getManagerConnection(): Promise<Connection> {
    const dbConn = mongoose.createConnection();
    return dbConn.openUri(process.env.MANAGER_URL, {
      dbName: 'manager',
    });
  }

  async getTenatConnection(dbName: string): Promise<Connection> {
    const dbConn = mongoose.createConnection();
    return dbConn.openUri(process.env.TENANT_URL, {
      dbName,
    });
  }
}
