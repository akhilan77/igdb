import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { Genre } from '../genres/genre.entity';
import { CreateGameDto } from './models/create-game.dto';
import { UpdateGameDto } from './models/update-game.dto';
export declare class GamesService {
    private readonly gameRepository;
    private readonly genreRepository;
    constructor(gameRepository: Repository<Game>, genreRepository: Repository<Genre>);
    create(dto: CreateGameDto): Promise<Game>;
    findAll(): Promise<Game[]>;
    findOneBySlug(slug: string): Promise<Game>;
    update(slug: string, dto: UpdateGameDto): Promise<Game>;
    remove(slug: string): Promise<void>;
}
