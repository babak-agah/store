import { Module } from '@nestjs/common';
import { ShoppingCartsController } from './shopping-carts.controller';
import { ShoppingCartsService } from './shopping-carts.service';

@Module({
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService]
})
export class ShoppingCartsModule {}
