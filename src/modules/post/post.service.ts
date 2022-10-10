import { Model } from 'mongoose'

import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CategoryModel } from '../category/category.model'
import { PostDto } from './post.dto'
import { PostModel } from './post.model'

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel.name)
    private readonly postModel: Model<PostModel>,
    @InjectModel(CategoryModel.name)
    private readonly categoryModel: Model<CategoryModel>,
  ) {}
  async create(post: PostDto) {
    try {
      await this.categoryModel.findById(post.category)
    } catch (error) {
      throw new ForbiddenException('分类不存在')
    }
    return this.postModel.create(post)
  }

  async findPostById(id: string) {
    const post = await this.postModel.findById(id).populate('category')
    if (!post) {
      throw new ForbiddenException('文章不存在')
    }
    return post
  }

  async postPaginate(pageCurrent: number, pageSize: number) {
    const postList = await this.postModel.populate(
      await this.postModel
        .aggregate([
          {
            $project: {
              content: {
                $substrCP: ['$content', 1, 100],
              },
              _id: 1,
              title: 1,
              category: 1,
              tags: 1,
              created: 1,
            },
          },
        ])
        .skip(pageSize * (pageCurrent - 1))
        .limit(pageSize)
        .sort({ created: 'asc' }),
      { path: 'category' },
    )
    const totalCount = await this.postModel.count()
    const totalPages = Math.ceil(totalCount / pageSize)
    return {
      postList,
      totalCount,
      totalPages,
    }
  }
}
