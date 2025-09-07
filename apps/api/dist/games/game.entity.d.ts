import { Genre } from '../genres/genre.entity';
export declare class Game {
    id: string;
    slug: string;
    title: string;
    description?: string | null;
    releaseDate?: string | null;
    coverImageUrl?: string | null;
    aggregatedRating: number;
    genres: Genre[];
}
