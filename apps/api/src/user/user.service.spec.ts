import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getTestDbModule } from '../../test/common/test-db-module';
import { UserRole } from '../auth/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import {
  generateRandomEmail,
  generateRandomUsername,
} from '../../test/common/generator-utils';

describe('UserService', () => {
  let service: UserService;
  let createdUserId: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports: [getTestDbModule({ sslEnabled: false })],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    if (createdUserId) {
      await service.deleteById(createdUserId);

      createdUserId = undefined;
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return created user', async () => {
    const userData: CreateUserDto = {
      email: generateRandomEmail(),
      username: generateRandomUsername(),
      password: 'hashed_password',
      roles: UserRole.USER,
    };
    const newUser = await service.create(userData);
    createdUserId = newUser.id;

    expect(newUser).toBeDefined();
    expect(newUser.email).toEqual(userData.email);
    expect(newUser.username).toEqual(userData.username);
    expect(newUser.roles).toEqual(userData.roles);
  });

  it('should get the created user', async () => {
    const userData: CreateUserDto = {
      email: generateRandomEmail(),
      username: generateRandomUsername(),
      password: 'hashed_password',
      roles: UserRole.USER,
    };
    const createdUser = await service.create(userData);
    createdUserId = createdUser.id;

    const foundUser = await service.findById(createdUser.id);

    expect(foundUser).toBeDefined();
    expect(foundUser.email).toEqual(userData.email);
    expect(foundUser.username).toEqual(userData.username);
    expect(foundUser.roles).toEqual(userData.roles);
  });
});
