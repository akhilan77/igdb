import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
	constructor(private readonly genresService: GenresService) {}

	@Get()
	findAll() {
		return this.genresService.findAll();
	}

	@Post()
	create(@Body('name') name: string) {
		return this.genresService.create(name);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.genresService.remove(id);
	}

	@Post('seed')
	seed() {
		const names = ['Action', 'Adventure', 'RPG', 'Shooter', 'Puzzle', 'Strategy', 'Sports', 'Racing'];
		return Promise.all(names.map((n) => this.genresService.create(n)));
	}
}


