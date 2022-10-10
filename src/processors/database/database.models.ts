import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { FriendsModel } from '~/modules/friends/friends.model';
import { UserModel } from '~/modules/user/user.model'
import { CategoryModel } from '../../modules/category/category.model';
import { PostModel } from '../../modules/post/post.model';
import { pageModel } from '../../modules/page/page.model';


export const databaseModels = [UserModel,PostModel,CategoryModel,FriendsModel,pageModel].map((model:any) =>
  MongooseModule.forFeature([
    { name: model.name, schema: SchemaFactory.createForClass(model) },
  ])
)
