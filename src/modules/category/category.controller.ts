import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from '~/common/decorator/auth.decorator';
import { ApiName } from '~/common/decorator/openapi.decorator';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
@ApiName
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


  @Post('/')
  @Auth()
  async create(@Body() category: CategoryDto) {
    return this.categoryService.create(category)
  }
}
