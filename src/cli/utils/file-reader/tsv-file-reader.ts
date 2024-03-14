import { City, Facilities, HouseType, UserType } from '../../../shared/const.js';
import { Coordinates, Offer } from '../../../shared/types.js';
import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, city, previewPhoto, photos, isPremium, isFavorite, rating, type, roomCount, guestsCount, price, facilities, name, email, avatarUrl, password, userType, countComments, coordinates]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city: city as City,
        previewPhoto,
        photos: photos.split(';'),
        isPremium: Boolean(isPremium),
        isFavorite: Boolean(isFavorite),
        rating: Number(rating),
        type: type as HouseType,
        roomCount: Number(roomCount),
        guestsCount: Number(guestsCount),
        price: Number(price),
        facilities: facilities.split(';') as Facilities[],
        author: {
          name,
          email,
          avatarUrl,
          password,
          type: userType as UserType
        },
        countComments: Number(countComments),
        coordinates: {
          latitude: Number(coordinates.split(';')[0]),
          longitude: Number(coordinates.split(';')[1])
        } as Coordinates,
      }));
  }
}
