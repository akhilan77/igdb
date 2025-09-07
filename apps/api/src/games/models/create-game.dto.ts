import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength } from 'class-validator';

export class CreateGameDto {
	@IsString()
	@Matches(/^[a-z0-9-]+$/)
	@MaxLength(255)
	@IsNotEmpty()
	slug!: string;

	@IsString()
	@MaxLength(255)
	@IsNotEmpty()
	title!: string;

	@IsOptional()
	@IsString()
	@MaxLength(2000)
	description?: string;

	@IsOptional()
	@IsDateString()
	releaseDate?: string;

	@IsOptional()
	@IsUrl()
	coverImageUrl?: string;

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	genres?: string[];
}


