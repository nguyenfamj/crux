import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface DatabaseOptions {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl: boolean;
}
export const CONNECTION_POOL = 'CONNECTION_POOL';

export const {
  ConfigurableModuleClass: ConfigurableDatabaseModuleClass,
  MODULE_OPTIONS_TOKEN: DATABASE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<DatabaseOptions>()
  .setClassMethodName('forRoot')
  .build();
