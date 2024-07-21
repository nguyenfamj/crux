import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { UserRole } from './enum/role.enum';
import { User } from '../db/schema.type';
import { JwtPayload } from './auth.types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getUserByCredentials(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      this.logger.error(`User with email ${email} not found`);
      return null;
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }

  async getUserFromJwtPayload(payload: JwtPayload) {
    const user = await this.userService.findById(payload.user_id);

    if (!user) {
      this.logger.error(
        `User with id ${payload.user_id} and email ${payload.email} not found`,
      );
      return null;
    }

    // TODO: Upgrade auth logic to be more secure in future
    if (user.email !== payload.email) {
      throw new BadRequestException('Invalid email in payload');
    }

    return user;
  }

  // TODO: Add possibility to register admin user
  async register(userData: RegisterRequestDto) {
    const userExisted = this.userService.alreadyExist({
      username: userData.username,
      email: userData.email,
    });

    if (userExisted) {
      throw new BadRequestException('User already existed');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Delete password in userData
    delete userData.password;
    userData.password = hashedPassword;

    // Hardcoded role to be normal user
    const newUser = await this.userService.create({
      ...userData,
      roles: UserRole.USER,
    });

    return newUser;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload: JwtPayload = { email: user.email, user_id: user.id };
    const signedToken = this.jwtService.sign(payload);

    return {
      accessToken: signedToken,
    };
  }
}
