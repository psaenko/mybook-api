import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/author.dto';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('author')
export class AuthorController {
	constructor(private readonly authorService: AuthorService) {}

	@Post()
	create(@Body() createAuthorDto: CreateAuthorDto) {
		return this.authorService.create(createAuthorDto);
	}

	@ApiQuery({ name: 'page', required: true, example: 1 })
	@Get()
	async findAll(@Query('page', new ParseIntPipe()) page: number) {
		return this.authorService.findAll(page);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Get(':id')
	findById(@Param('id') id: string) {
		return this.authorService.findById(id);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Put(':id')
	update(@Param('id') id: string, @Body() updateAuthorDto: CreateAuthorDto) {
		return this.authorService.update(id, updateAuthorDto);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.authorService.remove(id);
	}
}
