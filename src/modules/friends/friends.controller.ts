import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { Auth } from '~/common/decorator/auth.decorator'

import { ApiName } from '~/common/decorator/openapi.decorator'

import { FriendsModel, LinkState } from './friends.model'
import { FriendsService } from './friends.service'

@Controller('friends')
@ApiName
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('audit')
  async auditLink(@Body() friend: FriendsModel) {
    return this.friendsService.auditLink({
      state: LinkState.Audit,
      ...friend,
    })
  }

  @Get('/all')
  async getAll(){
    return await this.friendsService.getAll()
  }

  @Patch('/audit/:id')
  @Auth()
  async approveLink(@Param('id') id: string) {
    return await this.friendsService.approveLink(id)
  }
}
