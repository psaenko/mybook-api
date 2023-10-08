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
	ValidationPipe, UseGuards,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateDto, UpdateDto } from './dto/city.dto';
import { ApiParam, ApiQuery, ApiBearerAuth, ApiOperation,ApiTags, ApiResponse } from '@nestjs/swagger';
import { ALREADY_EXIST_ERROR } from './city.constants';
import { Roles } from '../decorators/roles.decorator';
import { ApiRoles } from '../decorators/api-roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('City')
@Controller('city')
export class CityController {
	private logger = new Logger('CityController');

	constructor(private readonly cityService: CityService) {
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Create a new city' })
	@ApiResponse({ status: 201, description: 'The city has been successfully created.' })
	@ApiResponse({ status: 400, description: 'City already exists or invalid data.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@Roles('ADMIN')
	@ApiRoles('ADMIN')
	@UseGuards(JwtAuthGuard)
	@Post()
	@UsePipes(new ValidationPipe())
	async create(@Body() createDto: CreateDto) {
		const oldCity = await this.cityService.findByName(createDto.name);
		if (oldCity) {
			this.logger.error(`On created city: ${createDto.name}. Error - ${ALREADY_EXIST_ERROR}`);
			throw new BadRequestException(ALREADY_EXIST_ERROR);
		}
		return this.cityService.create(createDto);
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get all cities' })
	@ApiResponse({ status: 200, description: 'Returns the list of all cities.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiQuery({ name: 'isShow', type: Boolean, required: true, example: [true, false] })
	@ApiParam({ name: 'page', required: true, type: Number, example: 1 })
	@Roles('ADMIN')
	@ApiRoles('ADMIN')
	@UseGuards(JwtAuthGuard)
	@Get()
	async findAll(
		@Query('isShow') isShow: boolean,
		@Query('page', new ParseIntPipe()) page: number,
	) {
		this.logger.log(`Getting all cities with isShow: ${isShow} and page: ${page}`);
		return this.cityService.findAll(isShow, page);
	}

	@ApiQuery({ name: 'isShow', type: Boolean, required: true, example: [true, false] })
	@ApiOperation({ summary: 'Get list of all cities' })
	@ApiResponse({ status: 200, description: 'Returns the list of all cities.' })
	@ApiRoles('ALL ROLES')
	@Get('list')
	async findAllList(@Query('isShow') isShow: boolean) {
		this.logger.log(`Getting all cities list with isShow: ${isShow}`);
		return this.cityService.findAllList(isShow);
	}

	@ApiBearerAuth()
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiOperation({ summary: 'Get a city by its id' })
	@ApiResponse({ status: 200, description: 'Returns the city found.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 404, description: 'City not found.' })
	@Roles('ADMIN')
	@ApiRoles('ADMIN')
	@UseGuards(JwtAuthGuard)
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

	@ApiBearerAuth()
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiOperation({ summary: 'Update a city by its id' })
	@ApiResponse({ status: 200, description: 'Returns the city found.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 404, description: 'City not found.' })
	@Roles('ADMIN')
	@ApiRoles('ADMIN')
	@UseGuards(JwtAuthGuard)
	@Put(':id')
	async update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
		this.logger.log(`Updating city with id: ${id}`);
		return this.cityService.update(id, updateDto);
	}

	@ApiBearerAuth()
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiOperation({ summary: 'Delete a city by its id' })
	@ApiResponse({ status: 200, description: 'Returns the city found.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 404, description: 'City not found.' })
	@Roles('ADMIN')
	@ApiRoles('ADMIN')
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		this.logger.log(`Deleting city with id: ${id}`);
		return this.cityService.remove(id);
	}
}
