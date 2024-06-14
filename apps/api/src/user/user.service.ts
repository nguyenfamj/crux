import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { databaseSchema } from '../db/db.schema';
import { DrizzleService } from '../db/drizzle.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(newUser: CreateUserDto) {
    const createdUser = await this.drizzleService.db
      .insert(databaseSchema.users)
      .values(newUser)
      .returning();

    return createdUser[0];
  }

  async findById(id: number) {
    const users = await this.drizzleService.db
      .select()
      .from(databaseSchema.users)
      .where(eq(databaseSchema.users.id, id));

    const user = users[0];

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async deleteById(id: number) {
    await this.drizzleService.db
      .delete(databaseSchema.users)
      .where(eq(databaseSchema.users.id, id));

    return true;
  }
}
