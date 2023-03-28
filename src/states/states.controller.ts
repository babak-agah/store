import { Body, Controller, Post } from '@nestjs/common';
import { StatesService } from './states.service';
import { CreateStateDto } from './dtos/create-state.dto';

@Controller('states')
export class StatesController {
  constructor(private StatesServices: StatesService) {}

  @Post()
  async createState(@Body() body: CreateStateDto) {
    const state = await this.StatesServices.createState(body);
    return state;
  }
}
