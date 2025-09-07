import { IsArray, IsDateString, IsOptional, IsString, IsUrl, Matches, MaxLength } from 'class-validator';

export class UpdateGameDto {
	@IsOptional()
	@IsString()
	@Matches(/^[a-z0-9-]+$/)
	@MaxLength(255)
	slug?: string;

	@IsOptional()
	@IsString()
	@MaxLength(255)
	title?: string;

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


