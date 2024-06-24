import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbModule } from '../../src/db/db.module';

export const getTestDbModule = (options: { sslEnabled?: boolean }) =>
  DbModule.forRootAsync({
    imports: [ConfigModule.forRoot()],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        user: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        ssl: options.sslEnabled,
      };
    },
  });
