import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostModel } from '../post/post.model';

@Injectable()
export class ArchiveService {
  constructor(
    @InjectModel(PostModel.name)
    private readonly postModel: Model<PostModel>,
  ) {}
  async getAllArchive() {
    const posts = await this.postModel.find().sort({ created: 'desc' }).select(['title','created','tags']).populate('category')
    const count = await this.postModel.count()
    return {
      posts,
      count
    }
  }
}
