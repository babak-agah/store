import { UpdateProductCategoriesDto } from './dtos/update-product-categoies.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDto } from './dtos/create-product-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product-categories')
@Controller('api/product-categories')
export class ProductCategoriesController {
  constructor(private productCategoriesService: ProductCategoriesService) {}

  @Post()
  async createCategory(@Body() body: CreateProductCategoryDto) {
    const result = this.productCategoriesService.create(body);
    return result;
  }

  @Get()
  getCategories(
    @Query('page') page = '1',
    @Query('count') count: '20',
    @Query('filter') filter,
  ) {
    let queryStr = filter;

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    );

    const query = JSON.parse(queryStr);
    // return query;

    // const query = { parent: { $exists: false } };

    return this.productCategoriesService.find(query);
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.productCategoriesService.findOne(id);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateProductCategoriesDto,
  ) {
    const result = await this.productCategoriesService.update(id, body);
    return result;
  }
}
