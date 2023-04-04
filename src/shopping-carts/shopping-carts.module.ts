import { Module } from '@nestjs/common';
import { ShoppingCartsController } from './shopping-carts.controller';
import { ShoppingCartsService } from './shopping-carts.service';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService],
})
export class ShoppingCartsModule {}
