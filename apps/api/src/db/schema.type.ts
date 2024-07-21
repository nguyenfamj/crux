import { databaseSchema } from './db.schema';

export type User = typeof databaseSchema.users.$inferSelect;
