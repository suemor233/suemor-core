import { IsString } from 'class-validator'
import { Prop, Schema } from '@nestjs/mongoose'

@Schema({
  collection: 'pages',
  toObject: { virtuals: true, getters: true },
  timestamps: {
    createdAt: 'created',
    updatedAt: true,
  },
  versionKey: false,
})
export class pageModel {

  @Prop()
  @IsString({ message: '标题' })
  title: string

  @Prop()
  @IsString({ message: '文章内容' })
  content: string

  @Prop()
  @IsString({ message: 'slug路径' })
  slug: string
}
