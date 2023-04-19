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
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilterQuery } from 'mongoose';
import { Product } from './product.entity';
import { SessionType } from 'src/utils/interfaces/session.interface';
import { CreateProductItemDto } from './dtos/create-product-item.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Token } from 'src/auth/decorator/token.decorator';
import { IToken } from 'src/auth/interfaces/Itoken';

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiBody({ type: [CreatePorductDto] })
  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Param('id') id: string, // categoryId
    @Body() body: CreatePorductDto,
    @Token() token: IToken,
  ) {
    if (!token.roles.includes('ADMIN')) throw new UnauthorizedException();
    const product = await this.productsService.createProduct(
      id,
      body,
      token.userId,
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

  @ApiBody({ type: [CreateProductItemDto] })
  @Post('product-items/:id')
  async addProductItem(
    @Param('id') id: string,
    @Body() data: CreateProductItemDto,
  ) {
    const result = await this.productsService.createProductItem(id, data);
    return result;
  }

  @ApiBody({ type: [CreateProductItemDto] })
  @Patch('product-items/:id')
  async updateProductItem(
    @Param('id') id: string,
    @Body() data: CreateProductItemDto,
  ) {
    const result = await this.productsService.updateProductItem(id, data);
    return result;
  }
}
