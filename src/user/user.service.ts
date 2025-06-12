import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepo.create({
      ...createUserDto,
      password: hashedPassword
    });
    return await this.userRepo.save(user);
  }

  async findAll() {
    return await this.userRepo.find();
  }

 async findOne(id: number) {
    return await this.userRepo.findOne({where:{
      id,
    }});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
   return await this.userRepo.update({id} , updateUserDto)
  }

  async remove(id: number) {
   return await this.userRepo.delete({id})
  }
}
