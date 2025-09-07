import { GamesService } from './games.service';
import { CreateGameDto } from './models/create-game.dto';
import { UpdateGameDto } from './models/update-game.dto';
export declare class GamesController {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    findAll(): Promise<import("./game.entity").Game[]>;
    findOne(slug: string): Promise<import("./game.entity").Game>;
    create(dto: CreateGameDto): Promise<import("./game.entity").Game>;
    update(slug: string, dto: UpdateGameDto): any;
    remove(slug: string): any;
}
