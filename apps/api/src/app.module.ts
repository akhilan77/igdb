import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { PingController } from './ping.controller';
import { StatusController } from './status.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { GenresModule } from './genres/genres.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT || 5432),
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'igdb',
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
      }),
    }),
    GamesModule,
    GenresModule,
  ],
  controllers: [AppController, PingController, StatusController],
  providers: [AppService],
})
export class AppModule {}
