import {
  IsObject,
  IsOptional,
  IsString, IsUrl
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'
export class UserDto {
  @ApiProperty({ required: true })
  @IsString({ message: '用户名' })
  username: string

  @ApiProperty({ required: true })
  @IsString({ message: '密码' })
  password: string
}

export class UserRegisterDto extends UserDto{
  @ApiProperty({ required: true })
  @IsUrl({ message: 'url 不合法' })
  avatar:string

  @ApiProperty({ description: '介绍' })
  introduce:string

  @IsOptional()
  @IsObject()
  @ApiProperty({ description: '各种社交 id 记录' })
  readonly socialIds?: Record<string, any>
}



