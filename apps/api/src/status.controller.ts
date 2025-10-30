import { Controller, Get } from '@nestjs/common';
import { GamesService } from './games/games.service';
import { GenresService } from './genres/genres.service';

@Controller('admin')
export class StatusController {
  constructor(private readonly gamesService: GamesService, private readonly genresService: GenresService) {}

  @Get('status')
  async status() {
    try {
      const games = await this.gamesService.findAll();
      const genres = await this.genresService.findAll();
      return {
        ok: true,
        games: { count: games.length },
        genres: { count: genres.length },
      };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  }
}
