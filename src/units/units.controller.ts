import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UpdateUnitDto } from './dtos/update-unit.dto';

@Controller('api/units')
export class UnitsController {
  constructor(private unitsService: UnitsService) {}

  @Get()
  async getUnits() {
    const result = await this.unitsService.getUnits();
    return result;
  }

  @Post()
  async addUnit(@Body() body: CreateUnitDto) {
    const result = await this.unitsService.createUnit(body);
    return result;
  }

  @Patch(':id')
  async updateUnit(@Param('id') id: string, @Body() body: UpdateUnitDto) {
    const result = await this.unitsService.updateUnit(id, body);
    return result;
  }
}
