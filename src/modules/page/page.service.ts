import { Model } from 'mongoose'

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { pageModel } from './page.model'
import { PageModule } from './page.module'

@Injectable()
export class PageService {

  constructor(
    @InjectModel(pageModel.name)
    private readonly pageModel: Model<pageModel>,
  ) {}
  create(page:PageModule) {
    this.pageModel.create(page)
    return 'ok'
  }

  async findPageBySlug(slug: string) {
    const page = await this.pageModel.findOne({ slug })
    if (!page) {
      throw new NotFoundException('页面不存在')
    }
    return page
  }
}
