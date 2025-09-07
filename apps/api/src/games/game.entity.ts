import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Genre } from '../genres/genre.entity';

@Entity({ name: 'games' })
export class Game {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Index({ unique: true })
	@Column({ type: 'varchar', length: 255 })
	slug!: string;

	@Index()
	@Column({ type: 'varchar', length: 255 })
	title!: string;

	@Column({ type: 'text', nullable: true })
	description?: string | null;

	@Column({ type: 'date', nullable: true })
	releaseDate?: string | null;

	@Column({ type: 'varchar', length: 255, nullable: true })
	coverImageUrl?: string | null;

	@Column({ type: 'float', default: 0 })
	aggregatedRating!: number;

	@ManyToMany(() => Genre, (genre) => genre.games, { cascade: true })
	@JoinTable({ name: 'game_genres' })
	genres!: Genre[];
}
