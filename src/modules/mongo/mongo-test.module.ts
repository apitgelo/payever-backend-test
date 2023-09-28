import { DynamicModule, Module, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { MongoClient } from 'mongodb';
import { DB_CONNECTION, MONGO_CLIENT } from './mongo.contants';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

@Module({})
export class MongoTestModule implements OnApplicationShutdown {
  private mongoClient: string;
  constructor(private readonly moduleRef: ModuleRef) {
    this.mongoClient = MONGO_CLIENT;
  }

  static forTest(): DynamicModule {
    const mongoClientProvider = {
      provide: MONGO_CLIENT,
      useFactory: async () => {
        if (!mongod) {
          mongod = await MongoMemoryServer.create();
        }
        const mongoUri = await mongod.getUri();
        return MongoClient.connect(mongoUri);
      },
    };

    const dbConnectionProvider = {
      provide: DB_CONNECTION,
      useFactory: async (mongoClient: MongoClient) => {
        return mongoClient.db();
      },
      inject: [MONGO_CLIENT],
    };

    return {
      module: MongoTestModule,
      providers: [dbConnectionProvider, mongoClientProvider],
      exports: [dbConnectionProvider, mongoClientProvider],
    };
  }

  async onApplicationShutdown() {
    const connection = this.moduleRef.get<MongoClient>(this.mongoClient);
    if (connection) await connection.close();
    if (mongod) await mongod.stop();
  }
}

export const closeInMongodConnection = async (connection?: MongoClient) => {
  if (connection) await connection.close();
  if (mongod) await mongod.stop();
};
