import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserRo } from './user.ro';

export class UserProfileRo {
  @ApiProperty()
  @Expose()
  @Type(() => UserRo)
  public readonly user: UserRo;
}
