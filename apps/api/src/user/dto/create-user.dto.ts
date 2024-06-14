export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  roles: string;
  isActive?: boolean;
}
