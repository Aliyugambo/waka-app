import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceModule } from './place/place.module';
import { PhotoController } from './photo/photo.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url: process.env.DATABASE_URL,
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),
    PlaceModule,
  ],
  controllers: [PhotoController],
})
export class AppModule {}
