import { Repository } from 'typeorm';
import { Genre } from './genre.entity';
export declare class GenresService {
    private readonly genreRepo;
    constructor(genreRepo: Repository<Genre>);
    findAll(): Promise<Genre[]>;
    findByNames(names: string[]): Promise<Genre[]>;
    create(name: string): Promise<Genre>;
    remove(id: string): Promise<void>;
}
