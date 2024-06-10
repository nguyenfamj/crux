import { Global, Module } from '@nestjs/common';
import {
  CONNECTION_POOL,
  ConfigurableDatabaseModule,
  DATABASE_OPTIONS,
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
      inject: [DATABASE_OPTIONS],
      useFactory: (databaseOptions: DatabaseOptions) => {
        return new Pool({
          host: databaseOptions.host,
          port: databaseOptions.port,
          user: databaseOptions.user,
          password: databaseOptions.password,
          database: databaseOptions.database,
        });
      },
    },
  ],
})
export class DBModule extends ConfigurableDatabaseModule {}
