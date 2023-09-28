import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface MongoModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<MongoModuleOptions> | MongoModuleOptions;
  inject?: any[];
}

export interface MongoModuleOptions {
  retryAttempts?: number;
  retryDelay?: number;
  uri: string;
}
