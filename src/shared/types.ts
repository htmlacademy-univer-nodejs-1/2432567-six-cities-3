import { CITIES, GOODS, TYPES } from './const.js';

export type City = typeof CITIES[number];
export type HouseType = typeof TYPES[number];
export type Goods = typeof GOODS[number]

export type User = {
  name: string;
  email: string;
  avatarPath: string;
  isPro: boolean;
}

export type Comment = {
  id: string;
  comment: string;
  postDate: string;
  rating: number;
  user: User;
};

export type Location = {
  latitude: number;
  longitude: number;
}

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City,
  previewImage: string,
  images: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  houseType: HouseType,
  countRooms: number,
  countGuests: number,
  price: number,
  goods: Goods[],
  user: User,
  location: Location,
}
