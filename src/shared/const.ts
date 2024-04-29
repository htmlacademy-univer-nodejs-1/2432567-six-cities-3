export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum CityCoordinates {
  Paris = '48.85661;2.351499',
  Cologne = '50.938361;6.959974',
  Brussels = '50.846557;4.351697',
  Amsterdam = '52.370216;4.895168',
  Hamburg = '53.550341;10.000654',
  Dusseldorf = '53.550341;10.000654'
}

export enum Facilities {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export enum HouseType {
  apartment = 'apartment',
  house = 'house',
  room = 'room',
  hotel = 'hotel'
}

export enum UserType {
  pro = 'pro',
  normal = 'normal'
}

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
