import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CONNECTION_POOL } from './db.module-definition';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { databaseSchema } from './db.schema';

@Injectable()
export class DrizzleService {
  public db: NodePgDatabase<typeof databaseSchema>;
  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) {
    this.db = drizzle(this.pool, { schema: databaseSchema });
  }
}
