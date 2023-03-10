import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UserRo } from './dto/user.ro';
import { plainToClass } from 'class-transformer';
import { UserIdDto } from './dto/userId.dto';
import { UserCreateRo } from './dto/user-create.ro';
import { UserProfileRo } from './dto/user-profile.ro';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userCreateDto: UserCreateDto): Promise<UserCreateRo> {
    const { password, ...userData } = userCreateDto;
    const user = this.usersRepository.create(userData);
    await user.setPassword(password);
    const response = plainToClass(UserCreateRo, await this.usersRepository.save(user), {
      excludeExtraneousValues: true,
    });
    return response;
  }

  async getUser(userIdDto: UserIdDto): Promise<UserRo> {
    const user = await this.usersRepository.findOne({
      where: { id: userIdDto.userId },
    });
    return plainToClass(UserRo, user, { excludeExtraneousValues: true });
  }

  async profile(mobile: string): Promise<UserProfileRo> {
    const user = await this.usersRepository.findOne({ where: { mobile } });
    return plainToClass(UserProfileRo, { user }, { excludeExtraneousValues: false });
  }

  async validate(mobile: string, password: string): Promise<UserRo> {
    const user = await this.usersRepository.findOne({ where: { mobile } });
    if (!user) {
      throw new UnauthorizedException({
        message: 'Mobile not Found',
      });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      throw new UnauthorizedException({
        message: 'Password is not valid',
      });
    }

    return plainToClass(UserRo, user, { excludeExtraneousValues: true });
  }
}
