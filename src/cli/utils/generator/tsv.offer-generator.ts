import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../random/random.js';
import {
  COUNT_PHOTOS,
  CITIES,
  FIRST_WEEK_DAY,
  GOODS,
  TYPES,
  LAST_WEEK_DAY,
  MAX_GUESTS,
  MAX_LENGTH_PASSWORD,
  MAX_PRICE,
  MAX_RATING,
  MAX_ROOMS,
  MIN_GUESTS,
  MIN_LENGTH_PASSWORD,
  MIN_PRICE,
  MIN_RATING,
  MIN_ROOMS,
  CityLocation
} from '../../../shared/const.js';
import { City, Goods, HouseType } from '../../../shared/types.js';

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<City>(CITIES);
    const previewPhoto = getRandomItem<string>(this.mockData.previewPhotos);
    const photos = getRandomItems<string>(this.mockData.photos, COUNT_PHOTOS);
    const isPremium = getRandomItem<boolean>([true, false]);
    const isFavorite = getRandomItem<boolean>([true, false]);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING);
    const type = getRandomItem<HouseType>(TYPES);
    const roomCount = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guestsCount = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const facilities = getRandomItems<Goods>(GOODS);
    const authorName = getRandomItem<string>(this.mockData.authorNames);
    const authorEmail = getRandomItem<string>(this.mockData.authorEmails);
    const authorAvatar = getRandomItem<string>(this.mockData.authorAvatars);
    const authorPassword = generateRandomValue(MIN_LENGTH_PASSWORD, MAX_LENGTH_PASSWORD);
    const authorType = getRandomItem<boolean>([true, false]);
    const coordinates = CityLocation[city];


    return [
      title,
      description,
      postDate,
      city,
      previewPhoto,
      photos,
      isPremium,
      isFavorite,
      rating,
      type,
      roomCount,
      guestsCount,
      price,
      facilities,
      authorName,
      authorEmail,
      authorAvatar,
      authorPassword,
      authorType,
      coordinates,
    ].join('\t');
  }
}
