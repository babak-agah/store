import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CitiesModule } from './cities/cities.module';
import { StatesModule } from './states/states.module';
import { ProductCategoriesModule } from './productCategories/productCategories.module';

const defaultOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  username: 'root',
  password: 'secret',
  database: 'store',
  entities: [],
  synchronize: true,
};

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/store'),
    TypeOrmModule.forRoot({
      ...defaultOptions,
    }),
    UsersModule,
    ProductsModule,
    StatesModule,
    CitiesModule,
    ProductCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
