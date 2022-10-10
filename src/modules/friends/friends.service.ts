import { Model } from 'mongoose'
import { NotFoundError } from 'rxjs'

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { FriendsModel, LinkState } from './friends.model'

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(FriendsModel.name)
    private readonly friendModel: Model<FriendsModel>,
  ) {}

  async auditLink(friend: FriendsModel) {
    const _friend = await this.friendModel.find({ url: friend.url })
    if (_friend.length > 0) {
      throw new ForbiddenException('朋友已经存在')
    }

    this.friendModel.create({
      ...friend,
      state: LinkState.Audit,
    })
    return 'ok'
  }

  async approveLink(id: string) {
    const doc = await this.friendModel.findOneAndUpdate(
      { _id: id },
      { state: LinkState.Pass },
      {lean:true}
    ) 
    if (!doc) {
      throw new NotFoundException()
    }
    return doc
  }


  async getAll() {
    return this.friendModel.aggregate().match({ state: LinkState.Pass }).sample(await this.friendModel.countDocuments())
  }
}
