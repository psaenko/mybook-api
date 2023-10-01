import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BookPageModel } from './book-page.model';

@Controller('book-page')
export class BookPageController {
	@Post('create')
	async create(@Body() dto: Omit<BookPageModel, '_id'>) {

	}

	@Get(':id')
	async get(@Param('id') id: string) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: BookPageModel) {

	}
}
