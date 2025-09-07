import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Game } from './game.entity';
import { Genre } from '../genres/genre.entity';
import { CreateGameDto } from './models/create-game.dto';
import { UpdateGameDto } from './models/update-game.dto';

@Injectable()
export class GamesService {
	constructor(
		@InjectRepository(Game) private readonly gameRepository: Repository<Game>,
		@InjectRepository(Genre) private readonly genreRepository: Repository<Genre>,
	) {}

	async create(dto: CreateGameDto): Promise<Game> {
		const genres = dto.genres?.length
			? await this.genreRepository.find({ where: { name: In(dto.genres) } })
			: [];
		const game = this.gameRepository.create({
			slug: dto.slug,
			title: dto.title,
			description: dto.description,
			releaseDate: dto.releaseDate ?? null,
			coverImageUrl: dto.coverImageUrl ?? null,
			genres,
		});
		return this.gameRepository.save(game);
	}

	findAll(): Promise<Game[]> {
		return this.gameRepository.find({ relations: { genres: true } });
	}

	async findOneBySlug(slug: string): Promise<Game> {
		const game = await this.gameRepository.findOne({
			where: { slug },
			relations: { genres: true },
		});
		if (!game) throw new NotFoundException('Game not found');
		return game;
	}

	async update(slug: string, dto: UpdateGameDto): Promise<Game> {
		const game = await this.findOneBySlug(slug);
		if (dto.title !== undefined) game.title = dto.title;
		if (dto.description !== undefined) game.description = dto.description;
		if (dto.releaseDate !== undefined) game.releaseDate = dto.releaseDate;
		if (dto.coverImageUrl !== undefined) game.coverImageUrl = dto.coverImageUrl;
		if (dto.genres !== undefined) {
			const genres = dto.genres.length
				? await this.genreRepository.find({ where: { name: In(dto.genres) } })
				: [];
			game.genres = genres;
		}
		return this.gameRepository.save(game);
	}

	async remove(slug: string): Promise<void> {
		const game = await this.findOneBySlug(slug);
		await this.gameRepository.remove(game);
	}
}


