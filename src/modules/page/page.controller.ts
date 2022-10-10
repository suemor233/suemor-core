import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiName } from '~/common/decorator/openapi.decorator';
import { PageService } from './page.service';
import { pageModel } from './page.model';
import { Auth } from '~/common/decorator/auth.decorator';

@Controller('page')
@ApiName
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post('/')
  @Auth()
  async create(@Body() page:pageModel) {
    return  this.pageService.create(page)
  }

  @Get('/slug/:slug')
  async findPageBySlug(@Param('slug') slug:string) {
    return this.pageService.findPageBySlug(slug)
  }

}
