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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const typeorm_1 = require("typeorm");
const genre_entity_1 = require("../genres/genre.entity");
let Game = class Game {
    id;
    slug;
    title;
    description;
    releaseDate;
    coverImageUrl;
    aggregatedRating;
    genres;
};
exports.Game = Game;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Game.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Game.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Game.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Game.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Game.prototype, "releaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Game.prototype, "coverImageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Game.prototype, "aggregatedRating", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => genre_entity_1.Genre, (genre) => genre.games, { cascade: true }),
    (0, typeorm_1.JoinTable)({ name: 'game_genres' }),
    __metadata("design:type", Array)
], Game.prototype, "genres", void 0);
exports.Game = Game = __decorate([
    (0, typeorm_1.Entity)({ name: 'games' })
], Game);
//# sourceMappingURL=game.entity.js.map