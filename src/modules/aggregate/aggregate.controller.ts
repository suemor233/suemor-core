import { Controller, Get } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { ApiName } from '~/common/decorator/openapi.decorator'

import { UserService } from '../user/user.service'
import { AggregateService } from './aggregate.service'

@Controller('aggregate')
@ApiName
export class AggregateController {
  constructor(
    private readonly aggregateService: AggregateService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @ApiOperation({ summary: '首屏数据' })
  async aggregate() {
    return this.userService.getUserInfo()
  }
}
