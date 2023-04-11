import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenSchema } from './refresh-token.entity';
import { JwtStrategy } from './stategy/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
