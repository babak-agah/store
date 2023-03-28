import { UpdatePorductDto } from './dtos/update-product.dto copy';
import { CreatePorductDto } from './dtos/create-product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { FilterQuery } from 'mongoose';
import { Product } from './product.entity';
import { SessionType } from 'src/utils/interfaces/session.interface';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async createProduct(@Session() session, @Body() body: CreatePorductDto) {
    const product = await this.productsService.insertProduct(
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
}
