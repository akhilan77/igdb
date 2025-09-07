import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './models/create-game.dto';
import { UpdateGameDto } from './models/update-game.dto';

@Controller('games')
export class GamesController {
	constructor(private readonly gamesService: GamesService) {}

	@Get()
	findAll() {
		return this.gamesService.findAll();
	}

	@Get(':slug')
	findOne(@Param('slug') slug: string) {
		return this.gamesService.findOneBySlug(slug);
	}

	@Post()
	create(@Body() dto: CreateGameDto) {
		return this.gamesService.create(dto);
	}

	@Put(':slug')
	update(@Param('slug') slug: string, @Body() dto: UpdateGameDto) {
		return this.gamesService.update(slug, dto);
	}

	@Delete(':slug')
	remove(@Param('slug') slug: string) {
		return this.gamesService.remove(slug);
	}
}


