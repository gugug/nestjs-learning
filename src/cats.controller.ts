
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ForbiddenException,
  UseFilters,
  ParseIntPipe, HttpStatus,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';
import { CatsService } from './cat.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from './exception.filter';
import { Roles } from './roles.decorator';

@Controller('cats')
export class CatsController {

  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }



  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }


  @Get()
  @UseFilters(new HttpExceptionFilter())
  async getError(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Get('num/:id')
  async findOnePipe(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
      id: number) {
    return `This action returns a #${id} cat`;
  }

}