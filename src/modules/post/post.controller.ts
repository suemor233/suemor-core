import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { Auth } from '~/common/decorator/auth.decorator'
import { ApiName } from '~/common/decorator/openapi.decorator'

import {  PaginateDto, PostDto } from './post.dto'
import { PostService } from './post.service'

@Controller('post')
@ApiName
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  // @Auth()
  async create(@Body() post: PostDto) {
    return await this.postService.create(post)
  }

  @Get(':id')
  @ApiOperation({ summary: '根据 id 查文章' })
  async findLostById(@Param('id') id: string) {
    return this.postService.findPostById(id)
  }

  @Get('/')
  @ApiOperation({ summary: '分页获取博文' })
  async getPaginate(@Query('pageCurrent') pageCurrent: string,@Query('pageSize') pageSize: string) {
    console.log(pageCurrent, pageSize)
    return this.postService.postPaginate(Number(pageCurrent), Number(pageSize))
  }
}
