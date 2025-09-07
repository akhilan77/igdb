import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Genre } from './genre.entity';

@Injectable()
export class GenresService {
	constructor(@InjectRepository(Genre) private readonly genreRepo: Repository<Genre>) {}

	findAll(): Promise<Genre[]> {
		return this.genreRepo.find();
	}

	async findByNames(names: string[]): Promise<Genre[]> {
		if (!names?.length) return [];
		return this.genreRepo.find({ where: { name: In(names) } });
	}

	async create(name: string): Promise<Genre> {
		const existing = await this.genreRepo.findOne({ where: { name } });
		if (existing) return existing;
		return this.genreRepo.save(this.genreRepo.create({ name }));
	}

	async remove(id: string): Promise<void> {
		const g = await this.genreRepo.findOne({ where: { id } });
		if (!g) throw new NotFoundException('Genre not found');
		await this.genreRepo.remove(g);
	}
}


