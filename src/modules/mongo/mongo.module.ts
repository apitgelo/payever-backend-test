import {
  DynamicModule,
  Global,
  Module,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { MongoClient } from 'mongodb';
import {
  DB_CONNECTION,
  MONGO_CLIENT,
  MONGO_MODULE_OPTIONS,
} from './mongo.contants';
import { defer } from 'rxjs';
import { handleRetry } from './mongo.utils';
import { MongoModuleAsyncOptions, MongoModuleOptions } from './mongo.interface';

@Global()
@Module({})
export class MongoModule implements OnApplicationShutdown {
  private mongoClient: string;
  constructor(private readonly moduleRef: ModuleRef) {
    this.mongoClient = MONGO_CLIENT;
  }

  static forRootAsync(options: MongoModuleAsyncOptions): DynamicModule {
    const mongoModuleOptionProvider = {
      provide: MONGO_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject,
    };

    const mongoClientProvider = {
      provide: MONGO_CLIENT,
      useFactory: async (mongoModuleOptions: MongoModuleOptions) => {
        const {
          retryAttempts = 5,
          retryDelay = 10000,
          uri,
        } = mongoModuleOptions;
        return await defer(async () => {
          return await MongoClient.connect(uri);
        })
          .pipe(handleRetry(retryAttempts, retryDelay))
          .toPromise();
      },
      inject: [MONGO_MODULE_OPTIONS],
    };

    const dbConnectionProvider = {
      provide: DB_CONNECTION,
      useFactory: async (mongoClient: MongoClient) => {
        return mongoClient.db();
      },
      inject: [MONGO_CLIENT, MONGO_MODULE_OPTIONS],
    };

    return {
      module: MongoModule,
      providers: [
        mongoModuleOptionProvider,
        dbConnectionProvider,
        mongoClientProvider,
      ],
      exports: [dbConnectionProvider, mongoClientProvider],
    };
  }

  async onApplicationShutdown() {
    const connection = this.moduleRef.get<MongoClient>(this.mongoClient);
    connection && (await connection.close());
  }
}
