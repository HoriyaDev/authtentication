import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from "src/auth/roles.enum";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  role?: Role;
}
