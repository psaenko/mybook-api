import {
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
import { PublicationService } from './publication.service';
import { PublicationDto } from './dto/publication.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiRoles } from '../decorators/api-roles.decorator';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Publication')
@Controller('publication')
export class PublicationController {
	private logger = new Logger('PublicationController');

	constructor(private readonly publicationService: PublicationService) {
	}

	@UsePipes(new ValidationPipe())
	@ApiOperation({ summary: 'Creating new publication' })
	@ApiResponse({ status: 200, description: 'Returns new category info.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })

	@Post()
	async create(@Body() publicationDto: PublicationDto) {
		return this.publicationService.create(publicationDto);
	}

	@ApiOperation({ summary: 'Get all publications' })
	@ApiResponse({ status: 200, description: 'Returns the list of all publications.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiQuery({ name: 'isShow', type: Boolean, required: true, example: [true, false] })
	@ApiQuery({ name: 'page', type: Number, required: true, example: 1 })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	async findAll(
		@Query('isShow') isShow: boolean,
		@Query('page', new ParseIntPipe()) page: number,
	) {
		this.logger.log(`Getting all publications with isShow: ${isShow} and page: ${page}`);
		return this.publicationService.findAll(isShow, page);
	}


	@ApiOperation({ summary: 'Get all publications from category' })
	@ApiResponse({ status: 200, description: 'Returns the list of all publications.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiQuery({ name: 'authors', required: false, isArray: true, type: String }) // массив ID авторов
	@ApiQuery({ name: 'hasFiles', type: Boolean, required: false }) // параметр для проверки наличия файлов
	@ApiQuery({ name: 'startYear', required: false, example: 2010 })
	@ApiQuery({ name: 'endYear', required: false, example: 2020 })
	@ApiQuery({ name: 'isShow', type: Boolean, required: true, example: [true, false] })
	@ApiQuery({ name: 'page', type: Number, required: true, example: 1 })
	@Get('category/:categoryId')
	async findAllByCategory(
		@Param('categoryId') categoryId: string,
		@Query('authors') authors: string[],
		@Query('startYear') startYear: number,
		@Query('endYear') endYear: number,
		@Query('hasFiles') hasFiles: boolean,
		@Query('isShow') isShow: boolean,
	) {
		return this.publicationService.findAllByCategory(
			categoryId,
			authors,
			startYear,
			endYear,
			hasFiles,
			isShow,
		);
	}

	@ApiOperation({ summary: 'Get one publication' })
	@ApiResponse({ status: 200, description: 'Returns one publication.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ALL ROLES')
	@Get(':id')
	async findById(@Param('id') id: string) {
		this.logger.log(`Getting publication by id: ${id}`);
		try {
			return await this.publicationService.findById(id);
		} catch (error) {
			this.logger.error(`Error getting publication by id: ${id} - ${(error as Error).message}`);
			throw error;
		}

	}

	@ApiOperation({ summary: 'Add file from publication' })
	@ApiResponse({ status: 200, description: 'Returns list of files from publication.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Put(':id/files')
	addFiles(@Param('id') id: string, @Body('files') files: string[]) {
		return this.publicationService.addFiles(id, files);
	}

	@ApiOperation({ summary: 'Remove file from publication' })
	@ApiResponse({ status: 200, description: 'Returns the list of files from publications.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Delete(':id/files/:filename')
	removeFile(@Param('id') id: string, @Param('filename') filename: string) {
		return this.publicationService.removeFile(id, filename);
	}

	@ApiOperation({ summary: 'Update publication' })
	@ApiResponse({ status: 200, description: 'Returns the updated publication.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Put(':id')
	async update(@Param('id') id: string, @Body() publication: Object) {
		this.logger.log(`Updating publication with id: ${id}`);
		return this.publicationService.update(id, publication);
	}

	@ApiOperation({ summary: 'Delete publication' })
	@ApiResponse({ status: 200, description: 'Ok' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		this.logger.log(`Deleting publication with id: ${id}`);
		return this.publicationService.remove(id);
	}
}
