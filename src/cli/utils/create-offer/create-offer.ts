import { City, Facilities, HouseType, UserType } from '../../../shared/const.js';
import { Coordinates, Offer, User } from '../../../shared/types.js';

export function createOffer(offerData: string): Offer {
  const [
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
    name,
    email,
    avatarUrl,
    password,
    userType,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name,
    email,
    avatarUrl,
    password,
    type: UserType[userType as UserType],
  } as User;

  const [latitude, longitude] = coordinates.split(';');

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: City[city as City],
    previewPhoto,
    photos: photos.split(';'),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: Number(rating),
    type: HouseType[type as HouseType],
    roomCount: Number(roomCount),
    guestsCount: Number(guestsCount),
    price: Number(price),
    facilities: facilities.split(';') as Facilities[],
    author: user,
    coordinates: {
      latitude: Number(latitude),
      longitude: Number(longitude)
    } as Coordinates,
  };
}
