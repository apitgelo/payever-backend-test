import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './modules/config/configuration';
import { MongoModule } from './modules/mongo/mongo.module';
import { UsersModule } from './modules/users/users.module';
import { RouterModule } from 'nest-router';
import routes from './app.router';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongoModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get('mongodb.uri'),
        };
      },
    }),
  ],
})
export class AppModule {}
