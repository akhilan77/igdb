"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const game_entity_1 = require("./game.entity");
const genre_entity_1 = require("../genres/genre.entity");
let GamesService = class GamesService {
    gameRepository;
    genreRepository;
    constructor(gameRepository, genreRepository) {
        this.gameRepository = gameRepository;
        this.genreRepository = genreRepository;
    }
    async create(dto) {
        const genres = dto.genres?.length
            ? await this.genreRepository.find({ where: { name: (0, typeorm_2.In)(dto.genres) } })
            : [];
        const game = this.gameRepository.create({
            slug: dto.slug,
            title: dto.title,
            description: dto.description,
            releaseDate: dto.releaseDate ?? null,
            coverImageUrl: dto.coverImageUrl ?? null,
            genres,
        });
        return this.gameRepository.save(game);
    }
    findAll() {
        return this.gameRepository.find({ relations: { genres: true } });
    }
    async findOneBySlug(slug) {
        const game = await this.gameRepository.findOne({
            where: { slug },
            relations: { genres: true },
        });
        if (!game)
            throw new common_1.NotFoundException('Game not found');
        return game;
    }
    async update(slug, dto) {
        const game = await this.findOneBySlug(slug);
        if (dto.title !== undefined)
            game.title = dto.title;
        if (dto.description !== undefined)
            game.description = dto.description;
        if (dto.releaseDate !== undefined)
            game.releaseDate = dto.releaseDate;
        if (dto.coverImageUrl !== undefined)
            game.coverImageUrl = dto.coverImageUrl;
        if (dto.genres !== undefined) {
            const genres = dto.genres.length
                ? await this.genreRepository.find({ where: { name: (0, typeorm_2.In)(dto.genres) } })
                : [];
            game.genres = genres;
        }
        return this.gameRepository.save(game);
    }
    async remove(slug) {
        const game = await this.findOneBySlug(slug);
        await this.gameRepository.remove(game);
    }
};
exports.GamesService = GamesService;
exports.GamesService = GamesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(game_entity_1.Game)),
    __param(1, (0, typeorm_1.InjectRepository)(genre_entity_1.Genre)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GamesService);
//# sourceMappingURL=games.service.js.map