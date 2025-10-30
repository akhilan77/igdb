"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const genres_service_1 = require("./genres/genres.service");
const games_service_1 = require("./games/games.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    app.enableCors({
        origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3001'],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Accept, Authorization',
    });
    try {
        const genresService = app.get(genres_service_1.GenresService);
        const gamesService = app.get(games_service_1.GamesService);
        const existing = await gamesService.findAll();
        if (!existing || existing.length === 0) {
            console.log('Seeding demo genres and games (local dev)...');
            const action = await genresService.create('Action');
            const rpg = await genresService.create('RPG');
            const indie = await genresService.create('Indie');
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
    }
    catch (e) {
        console.warn('Seeding skipped or failed:', e);
    }
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application listening on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map