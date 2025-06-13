import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/jwt_auth.guard';
import { RolesGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { PermissionsRequired } from 'src/permissions/permissions.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.findOne(req.user.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...result } = user;
    return result;
  }


  @UseGuards( AuthGuard,RolesGuard)
  @Roles(Role.Moderator)
  @Get('moderator')
  getModeratortData(){
    return 'only for moderator'
  }
@UseGuards(AuthGuard, PermissionsGuard)
@PermissionsRequired('delete:user')
@Delete(':id')
async deleteUser(@Param('id') id: string) {
  const userId = parseInt(id, 10); // convert string to number
  return this.userService.remove(userId);
}


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  
}
