import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { Genre } from '../genres/genre.entity';
import { CreateGameDto } from './models/create-game.dto';
export declare class GamesService {
    private readonly gameRepo;
    private readonly genreRepo;
    constructor(gameRepo: Repository<Game>, genreRepo: Repository<Genre>);
    create(dto: CreateGameDto): Promise<Game>;
    findAll(): Promise<Game[]>;
    findOneBySlug(slug: string): Promise<Game>;
}
