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
exports.GenresController = void 0;
const common_1 = require("@nestjs/common");
const genres_service_1 = require("./genres.service");
let GenresController = class GenresController {
    genresService;
    constructor(genresService) {
        this.genresService = genresService;
    }
    findAll() {
        return this.genresService.findAll();
    }
    create(name) {
        return this.genresService.create(name);
    }
    remove(id) {
        return this.genresService.remove(id);
    }
    seed() {
        const names = ['Action', 'Adventure', 'RPG', 'Shooter', 'Puzzle', 'Strategy', 'Sports', 'Racing'];
        return Promise.all(names.map((n) => this.genresService.create(n)));
    }
};
exports.GenresController = GenresController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GenresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GenresController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GenresController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GenresController.prototype, "seed", null);
exports.GenresController = GenresController = __decorate([
    (0, common_1.Controller)('genres'),
    __metadata("design:paramtypes", [genres_service_1.GenresService])
], GenresController);
//# sourceMappingURL=genres.controller.js.map