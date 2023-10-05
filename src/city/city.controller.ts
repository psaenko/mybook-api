import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Post,
	Put,
	Query,
	ParseIntPipe,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/city.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ALREADY_EXIST_ERROR } from './city.constants';

@ApiTags('City')
@Controller('city')
export class CityController {
	private logger = new Logger('CityController');

	constructor(private readonly cityService: CityService) {
	}

	@Post()
	@UsePipes(new ValidationPipe())
	async create(@Body() createCityDto: CreateCityDto) {
		const oldCity = await this.cityService.findByName(createCityDto.name);
		if (oldCity) {
			this.logger.error(`On created city: ${createCityDto.name}. Error - ${ALREADY_EXIST_ERROR}`);
			throw new BadRequestException(ALREADY_EXIST_ERROR);
		}
		return this.cityService.create(createCityDto);
	}

	@Get()
	async findAll(
		@Query('isShow') isShow: boolean,
		@Query('page', new ParseIntPipe()) page: number,
	) {
		this.logger.log(`Getting all cities with isShow: ${isShow} and page: ${page}`);
		return this.cityService.findAll(isShow, page);
	}

	@ApiQuery({ name: 'isShow', type: Boolean, required: true, example: [true, false] })
	@Get('list')
	async findAllList(@Query('isShow') isShow: boolean) {
		this.logger.log(`Getting all cities list with isShow: ${isShow}`);
		return this.cityService.findAllList(isShow);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Get(':id')
	async findById(@Param('id') id: string) {
		this.logger.log(`Getting city by id: ${id}`);
		try {
			return await this.cityService.findById(id);
		} catch (error) {
			this.logger.error(`Error getting city by id: ${id} - ${(error as Error).message}`);
			throw error;
		}
	}


	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Put(':id')
	async update(@Param('id') id: string, @Body() city: Object) {
		this.logger.log(`Updating city with id: ${id}`);
		return this.cityService.update(id, city);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Delete(':id')
	async remove(@Param('id') id: string) {
		this.logger.log(`Deleting city with id: ${id}`);
		return this.cityService.remove(id);
	}
}
