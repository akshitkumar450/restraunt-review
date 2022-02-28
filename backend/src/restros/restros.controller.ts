import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RestrosService } from './restros.service';
import {
  createRestroSchema,
  updateRestroSchema,
} from './schemas/restro.schema';

@Controller('restros')
export class RestrosController {
  constructor(private restroService: RestrosService) {}

  @Get('/')
  getAllRestraunt() {
    return this.restroService.findAllRestros();
  }

  @Post('/')
  createRestraunt(@Body() body) {
    const { value, error } = createRestroSchema.validate(body);
    if (error) throw error;
    return this.restroService.createRestro(value);
  }

  @Delete('/:id')
  deleteRestraunt(@Param() id: string) {
    return this.restroService.deleteRestrant(id);
  }

  @Put('/:id')
  updateRestraunt(@Param() id: string, @Body() body) {
    const { value, error } = updateRestroSchema.validate(body);
    if (error) throw error;
    return this.restroService.updateRestraunt(id, value);
  }
}
