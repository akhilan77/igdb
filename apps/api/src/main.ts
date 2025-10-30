import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GenresService } from './genres/genres.service';
import { GamesService } from './games/games.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

	// Enable CORS for the frontend (default to http://localhost:3001)
	// You can override by setting CORS_ORIGIN as a comma-separated list, e.g.:
	// CORS_ORIGIN=http://localhost:3001,http://localhost:3002
	app.enableCors({
		origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3001'],
		credentials: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		allowedHeaders: 'Content-Type, Accept, Authorization',
	});

	// Seed some demo data on startup if DB is empty (helpful for local dev)
	try {
		const genresService = app.get(GenresService);
		const gamesService = app.get(GamesService);
		const existing = await gamesService.findAll();
		if (!existing || existing.length === 0) {
			console.log('Seeding demo genres and games (local dev)...');
			// ensure some genres exist
			const action = await genresService.create('Action');
			const rpg = await genresService.create('RPG');
			const indie = await genresService.create('Indie');
			// create sample games
			await gamesService.create({
				slug: 'hollow-knight',
				title: 'Hollow Knight',
				description: 'An epic action-adventure through a vast, ruined kingdom of insects.',
				releaseDate: '2017-02-24',
				genres: ['Action', 'Indie'],
			});
			await gamesService.create({
				slug: 'the-witcher-3',
				title: 'The Witcher 3: Wild Hunt',
				description: 'A story-driven, next-generation open world role-playing game.',
				releaseDate: '2015-05-19',
				genres: ['RPG', 'Action'],
			});
		}
	} catch (e) {
		console.warn('Seeding skipped or failed:', e);
	}

	await app.listen(process.env.PORT ?? 3000);
	// Helpful log so you know the app URL after it starts
	// (useful in development when PORT may be overridden)
	console.log(`Application listening on: ${await app.getUrl()}`);
}

bootstrap();
