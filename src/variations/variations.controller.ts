import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VariationsService } from './variations.service';
import { CreateVariationDto } from './dtos/create-variation.dto';

@Controller('api/variations')
export class VariationsController {
  constructor(private variationsService: VariationsService) {}

  @Post(':id')
  async createVariation(
    @Param('id') id: string,
    @Body() body: CreateVariationDto,
  ) {
    const result = await this.variationsService.createVariation(id, body);
    return result;
  }

  @Get()
  async getAll() {
    const result = await this.variationsService.find();
    return result;
  }

  @Get(':id')
  async getVariationsInProductCategory(@Param('id') id: string) {
    const result = await this.variationsService.find();
    return result;
  }
}
