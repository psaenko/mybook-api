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
	ValidationPipe,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationDto } from './dto/publication.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Publication')
@Controller('publication')
export class PublicationController {
	private logger = new Logger('PublicationController');

	constructor(private readonly publicationService: PublicationService) {
	}

	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() publicationDto: PublicationDto) {
		return this.publicationService.create(publicationDto);
	}

	@Get()
	async findAll(
		@Query('isShow') isShow: boolean,
		@Query('page', new ParseIntPipe()) page: number,
	) {
		this.logger.log(`Getting all publications with isShow: ${isShow} and page: ${page}`);
		return this.publicationService.findAll(isShow, page);
	}


	@ApiParam({ name: 'categoryId', required: true, example: '6512f25c770624afefed1293' })
	@ApiQuery({ name: 'author', required: false, example: '6512f25c770624afefed1293' })
	@ApiQuery({ name: 'startYear', required: false, example: 2010 })
	@ApiQuery({ name: 'endYear', required: false, example: 2020 })
	@ApiQuery({ name: 'isShow', type: Boolean, required: true, example: [true, false] })
	@ApiQuery({ name: 'page', type: Number, required: true, example: 1 })
	@Get('category/:categoryId')
	async findAllByCategory(
		@Param('categoryId') categoryId: string,
		@Query('author') author: string,
		@Query('startYear', new ParseIntPipe()) startYear: number,
		@Query('endYear', new ParseIntPipe()) endYear: number,
		@Query('isShow') isShow: boolean,
		@Query('page', new ParseIntPipe()) page: number,
	) {
		return this.publicationService.findAllByCategory(
			categoryId,
			author,
			startYear,
			endYear,
			isShow,
			page,
		);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
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
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Put(':id/files')
	addFiles(@Param('id') id: string, @Body('files') files: string[]) {
		return this.publicationService.addFiles(id, files);
	}
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Delete(':id/files/:filename')
	removeFile(@Param('id') id: string, @Param('filename') filename: string) {
		return this.publicationService.removeFile(id, filename);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Put(':id')
	async update(@Param('id') id: string, @Body() publication: Object) {
		this.logger.log(`Updating publication with id: ${id}`);
		return this.publicationService.update(id, publication);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Delete(':id')
	async remove(@Param('id') id: string) {
		this.logger.log(`Deleting publication with id: ${id}`);
		return this.publicationService.remove(id);
	}
}
