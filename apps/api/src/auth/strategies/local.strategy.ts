import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService
      .getUserByCredentials(email, password)
      .catch((error) => {
        this.logger.error(`Failed to validate user ${email}, error: ${error}`);
        throw new UnauthorizedException();
      });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
