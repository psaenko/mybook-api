import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateDto, UpdateDto } from './dto/author.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { ApiRoles } from '../decorators/api-roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Author')
@Controller('author')
export class AuthorController {
	constructor(private readonly authorService: AuthorService) {}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Create a new author' })
	@ApiResponse({ status: 201, description: 'The author has been successfully created.' })
	@ApiResponse({ status: 400, description: 'Author already exists or invalid data.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@Roles('ADMIN')
	@ApiRoles('ADMIN')
	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createDto: CreateDto) {
		return this.authorService.create(createDto);
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get all cities' })
	@ApiResponse({ status: 200, description: 'Returns the list of all authors.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiQuery({ name: 'isShow', type: Boolean, required: true, example: [true, false] })
	@ApiParam({ name: 'page', required: true, type: Number, example: 1 })
	@Roles('ADMIN')
	@ApiRoles('ADMIN')
	@UseGuards(JwtAuthGuard)
	@Get()
	async findAll(@Query('page', new ParseIntPipe()) page: number) {
		return this.authorService.findAll(page);
	}

	@ApiBearerAuth()
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiOperation({ summary: 'Get a author by its id' })
	@ApiResponse({ status: 200, description: 'Returns the author found.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 404, description: 'Author not found.' })
	@Roles('ADMIN')
	@ApiRoles('ADMIN')
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findById(@Param('id') id: string) {
		return this.authorService.findById(id);
	}

	@ApiBearerAuth()
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiOperation({ summary: 'Update a author by its id' })
	@ApiResponse({ status: 200, description: 'Returns the author found.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 404, description: 'Author not found.' })
	@Roles('ADMIN')
	@ApiRoles('ADMIN')
	@UseGuards(JwtAuthGuard)
	@Put(':id')
	update(@Param('id') id: string, @Body() updateDto:UpdateDto) {
		return this.authorService.update(id, updateDto);
	}

	@ApiBearerAuth()
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiOperation({ summary: 'Delete a author by its id' })
	@ApiResponse({ status: 200, description: 'Returns the author found.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiResponse({ status: 404, description: 'Author not found.' })
	@Roles('ADMIN')
	@ApiRoles('ADMIN')
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.authorService.remove(id);
	}
}
