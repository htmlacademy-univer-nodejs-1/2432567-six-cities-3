import { City, Location } from './types.js';

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const CityLocation: { [key in City]: Location } = {
  Paris: {
    latitude: 48.85661,
    longitude: 2.351499,
  },
  Cologne: {
    latitude: 50.938361,
    longitude: 6.959974,
  },
  Brussels: {
    latitude: 50.846557,
    longitude: 4.351697,
  },
  Amsterdam: {
    latitude: 52.37454,
    longitude: 4.897976,
  },
  Hamburg: {
    latitude: 53.550341,
    longitude: 10.000654,
  },
  Dusseldorf: {
    latitude: 51.225402,
    longitude: 6.776314,
  },
};

export const GOODS = [
  'Breakfast',
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge',
];
export const TYPES = ['Apartment', 'Room', 'House', 'Hotel'];

export const MIN_LENGTH_NAME = 1;
export const MAX_LENGTH_NAME = 15;

export const MIN_LENGTH_PASSWORD = 6;
export const MAX_LENGTH_PASSWORD = 12;

export const MIN_LENGTH_TITLE = 10;
export const MAX_LENGTH_TITLE = 100;

export const MIN_LENGTH_DESCRIPTION = 10;
export const MAX_LENGTH_DESCRIPTION = 100;

export const MIN_PRICE = 100;
export const MAX_PRICE = 100_000;

export const COUNT_PHOTOS = 6;

export const FIRST_WEEK_DAY = 1;
export const LAST_WEEK_DAY = 7;

export const MIN_RATING = 1;
export const MAX_RATING = 5;

export const MIN_ROOMS = 1;
export const MAX_ROOMS = 8;

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 8;

export const DEFAULT_DB_PORT = '27018';
export const DEFAULT_USER_PASSWORD = 'QWErty321';
export const DEFAULT_OFFER_COUNT = 60;
export const PREMIUM_OFFER_COUNT = 3;
export const DEFAULT_COMMENT_COUNT = 50;

export const JWT_ALGORITHM = 'HS256';
export const JWT_EXPIRED = '2d';

export const DEFAULT_AVATAR_FILE_NAME = 'default-avatar.jpeg';
export const DEFAULT_PREVIEW_FILE_NAME = 'default-preview.jpeg';


export const STATIC_UPLOAD_ROUTE = '/upload';
export const STATIC_FILES_ROUTE = '/static';

export const DEFAULT_STATIC_IMAGES = [
  'default-avatar.jpeg',
];

export const STATIC_RESOURCE_FIELDS = [
  'avatarPath',
  'image'
];
