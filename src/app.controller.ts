import { FastifyReply } from 'fastify';
import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public(@Res() res: FastifyReply) {
    // return this.appService.getHello();
  }
}
