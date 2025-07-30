import { Controller, Get, Query } from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('google')
  async getGooglePlaces(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('type') type: string,
    @Query('search') search?: string,
  ) {
    return this.placeService.fetchGooglePlaces(
      Number(lat),
      Number(lon),
      type,
      search,
    );
  }
}
