import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { StatesModule } from './states/states.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';
import { VariationsModule } from './variations/variations.module';
import { UnitsModule } from './units/units.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/store'),
    UsersModule,
    ProductsModule,
    StatesModule,
    ProductCategoriesModule,
    ShoppingCartsModule,
    VariationsModule,
    UnitsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
