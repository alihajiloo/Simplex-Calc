import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserRo } from './dto/user.ro';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { ErrorsInterceptor } from 'src/interceptors/errors.interceptor';
import { UserCreateRo } from './dto/user-create.ro';
import { UserIdDto } from './dto/userId.dto';
import { Request } from 'express';
import { UserProfileRo } from './dto/user-profile.ro';

@ApiTags('User')
@Controller('user')
@UseInterceptors(ErrorsInterceptor)
export class UsersController {
  constructor(@Inject(UsersService) private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: UserRo,
  })
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserCreateRo> {
    return await this.usersService.create(userCreateDto);
  }

  @Get()
  @ApiOkResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getUser(@Query() userIdDto: UserIdDto): Promise<UserRo> {
    return await this.usersService.getUser(userIdDto);
  }

  @Get('profile')
  @ApiOkResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async profile(@Req() request: Request): Promise<UserProfileRo> {
    const mobile = request.headers['user']['mobile'];
    return await this.usersService.profile(mobile);
  }
}
