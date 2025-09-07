import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { Genre } from '../genres/genre.entity';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Game, Genre])],
	providers: [GamesService],
	controllers: [GamesController],
	exports: [GamesService],
})
export class GamesModule {}


