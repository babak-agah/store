import { UpdatePorductDto } from './dtos/update-product.dto';
import { CreatePorductDto } from './dtos/create-product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { FilterQuery } from 'mongoose';
import { Product } from './product.entity';
import { SessionType } from 'src/utils/interfaces/session.interface';
import { CreateProductItemDto } from './dtos/create-product-item.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async createProduct(@Session() session, @Body() body: CreatePorductDto) {
    const product = await this.productsService.createProduct(
      body,
      session.userId,
    );
    return product;
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Get()
  async getProducts() {
    return this.productsService.getProducts({});
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProductByCreator(
    @Session() session: SessionType,
    @Param('id') id: string,
  ) {
    let filter: FilterQuery<Product> = { _id: id };
    if (!session.admin) {
      filter = { ...filter, userId: session.userId };
    }

    return this.productsService.deleteProduct(filter);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateProduct(
    @Session() session: SessionType,
    @Param('id') id: string,
    @Body() body: UpdatePorductDto,
  ) {
    let filter: FilterQuery<Product> = { _id: id };
    if (!session.admin) {
      filter = { ...filter, userId: session.userId };
    }

    const result = await this.productsService.updateProduct(filter, body);

    return result;
  }

  @Post(':id')
  @UseGuards(AuthGuard)
  async addProductItem(
    @Param('id') id: string,
    @Body() data: CreateProductItemDto,
  ) {
    const result = await this.productsService.createProductItem(id, data);
    return result;
  }

  @Patch('product-items/:id')
  @UseGuards(AuthGuard)
  async updateProductItem(
    @Param('id') id: string,
    @Body() data: CreateProductItemDto,
  ) {
    const result = await this.productsService.updateProductItem(id, data);
    return result;
  }
}
