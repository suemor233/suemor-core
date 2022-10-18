import { Model } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CategoryModel } from './category.model'
import { CategoryDto } from './category.dto'

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(CategoryModel.name)
    private readonly categoryModel: Model<CategoryModel>,
  ) {}
  create(category: CategoryDto) {
    return this.categoryModel.create(category)
  }

  find(slug: string) {
    return this.categoryModel.find({ slug })
  }
}
