import { GenresService } from './genres.service';
export declare class GenresController {
    private readonly genresService;
    constructor(genresService: GenresService);
    findAll(): Promise<import("./genre.entity").Genre[]>;
    create(name: string): Promise<import("./genre.entity").Genre>;
    remove(id: string): Promise<void>;
    seed(): Promise<import("./genre.entity").Genre[]>;
}
