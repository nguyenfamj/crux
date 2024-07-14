import { Injectable, NotFoundException } from '@nestjs/common';
import { eq, or } from 'drizzle-orm';
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

  async findByEmail(email: string) {
    const users = await this.drizzleService.db
      .select()
      .from(databaseSchema.users)
      .where(eq(databaseSchema.users.email, email));

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

  async alreadyExist(fields: { username: string; email: string }) {
    const results = await this.drizzleService.db
      .select({ id: databaseSchema.users.id })
      .from(databaseSchema.users)
      .where(
        or(
          eq(databaseSchema.users.username, fields.username),
          eq(databaseSchema.users.email, fields.email),
        ),
      )
      .limit(1);

    return results.length > 0;
  }
}
