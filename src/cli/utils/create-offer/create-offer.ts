import { City, Facilities, HouseType, UserType } from '../../../shared/const.js';
import { Coordinates, Offer, User } from '../../../shared/types.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    preview,
    photos,
    isPremium,
    isFavorite,
    rating,
    type,
    countRooms,
    countGuests,
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
    userType: UserType[userType as UserType],
  } as User;

  const [latitude, longitude] = coordinates.split(';');

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: City[city as City],
    preview,
    photos: photos.split(';'),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: Number(rating),
    houseType: HouseType[type as HouseType],
    countRooms: Number(countRooms),
    countGuests: Number(countGuests),
    price: Number(price),
    facilities: facilities.split(';') as Facilities[],
    author: user,
    coordinates: {
      latitude: Number(latitude),
      longitude: Number(longitude)
    } as Coordinates,
  };
}
