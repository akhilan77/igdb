import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '../games/game.entity';

@Entity({ name: 'genres' })
export class Genre {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Index({ unique: true })
	@Column({ type: 'varchar', length: 100 })
	name!: string;

	@ManyToMany(() => Game, (game) => game.genres)
	games!: Game[];
}
