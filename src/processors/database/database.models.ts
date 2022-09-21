import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { UserModel } from '~/modules/user/user.model'
import { CategoryModel } from '../../modules/category/category.model';
import { PostModel } from '../../modules/post/post.model';


export const databaseModels = [UserModel,PostModel,CategoryModel].map((model:any) =>
  MongooseModule.forFeature([
    { name: model.name, schema: SchemaFactory.createForClass(model) },
  ])
)
