import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDto } from './post.dto';
import { PostModel } from './post.model';

@Injectable()

export class PostService {
  constructor(
    @InjectModel(PostModel.name)
    private readonly postModel: Model<PostModel>,
  ) {}
  create(post: PostDto) {
    console.log(post);
    return this.postModel.create(post);
  }

  async findPostById(id: string) {
    const post = await this.postModel.findById(id).populate('category')
    if (!post) {
      throw new ForbiddenException('文章不存在')
    }
    return post
  }

  async postPaginate(pageCurrent: number, pageSize: number) {
    const postList = await this.postModel
      .find()
      .skip(pageSize * (pageCurrent - 1))
      .limit(pageSize)
      .sort('-createdAt')
      .populate('category')
      .lean()
    const totalCount = await this.postModel.count()
    const totalPages = Math.ceil(totalCount / pageSize)
    return {
      postList,
      totalCount,
      totalPages,
    }
  }
}
