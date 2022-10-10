import { IsEnum, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator'
import { Prop, Schema } from '@nestjs/mongoose'


export enum LinkState {
  Pass,
  Audit
}

@Schema({
  collection: 'friends',
  toObject: { virtuals: true, getters: true },
  timestamps: {
    createdAt: 'created',
    updatedAt: false,
  },
  versionKey: false,
})
export class FriendsModel  {

  @Prop({required:true})
  @IsString({ message: '名称' })
  @MaxLength(20, { message: '名称太长了' })
  name: string

  @Prop({unique:true,required:true})
  @IsUrl(
    { require_protocol: true, protocols: ['https'] },
    { message: '只有 HTTPS 被允许哦' },
  )
  url: string


  @IsUrl(
    { require_protocol: true, protocols: ['https'] },
    { message: '只有 HTTPS 被允许哦' },
  )
  @Prop({ trim: true })
  avatar:string

  @IsString()
  @Prop({ trim: true })
  description: string

  @IsOptional()
  @IsEnum(LinkState)
  @Prop({ default: LinkState.Pass })
  state: LinkState
}
