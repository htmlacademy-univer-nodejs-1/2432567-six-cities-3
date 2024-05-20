import { City, Facilities, HouseType, UserType } from './const.js';

export type User = {
  name: string;
  email: string;
  avatarPath: string;
  userType: UserType;
}

export type Comment = {
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
  preview: string,
  photos: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  houseType: HouseType,
  countRooms: number,
  countGuests: number,
  price: number,
  facilities: Facilities[],
  author: User,
  coordinates: Coordinates,
}
