import { City, Facilities, HouseType, UserType } from './const.js';

type User = {
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
  type: UserType;
}

type Commet = {
  text: string;
  date: string;
  rating: number;
  author: User;
}

type Coordinates = {
  latitude: number;
  longitude: number;
}

type Offer = {
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
  countComments: number,
  coordinates: Coordinates,
}

export type { User, Commet, Offer, Coordinates };
