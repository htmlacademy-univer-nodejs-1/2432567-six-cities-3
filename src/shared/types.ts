import { City, Facilities, HouseType, UserType } from './const.js';

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
  type: UserType;
}

export type Commet = {
  text: string;
  date: string;
  rating: number;
  author: User;
}

export type Coordinates = {
  latitude: number;
  longitude: number;
}

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City,
  previewPhoto: string,
  photos: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  type: HouseType,
  roomCount: number,
  guestsCount: number,
  price: number,
  facilities: Facilities[],
  author: User,
  coordinates: Coordinates,
}
