import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [DBModule],
  providers: [UserService],
})
export class UserModule {}
