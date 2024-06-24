import { Global, Module } from '@nestjs/common';
import {
  CONNECTION_POOL,
  ConfigurableDatabaseModuleClass,
  DATABASE_OPTIONS_TOKEN,
  DatabaseOptions,
} from './db.module-definition';
import { Pool } from 'pg';
import { DrizzleService } from './drizzle.service';

@Global()
@Module({
  exports: [DrizzleService],
  providers: [
    DrizzleService,
    {
      provide: CONNECTION_POOL,
      inject: [DATABASE_OPTIONS_TOKEN],
      useFactory: (databaseOptions: DatabaseOptions) => {
        return new Pool({
          host: databaseOptions.host,
          port: databaseOptions.port,
          user: databaseOptions.user,
          password: databaseOptions.password,
          database: databaseOptions.database,
          ssl: databaseOptions.ssl,
        });
      },
    },
  ],
})
export class DbModule extends ConfigurableDatabaseModuleClass {}
