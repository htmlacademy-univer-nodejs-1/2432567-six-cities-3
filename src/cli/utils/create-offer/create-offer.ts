import { City, Goods, HouseType, Location, Offer, User } from '../../../shared/types.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    houseType,
    countRooms,
    countGuests,
    price,
    goods,
    name,
    email,
    avatarPath,
    password,
    isPro,
    location
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name,
    email,
    avatarPath,
    password,
    isPro: Boolean(isPro),
  } as User;

  const [latitude, longitude] = location.split(';');

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: city as City,
    previewImage,
    images: images.split(';'),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: Number(rating),
    houseType: houseType as HouseType,
    countRooms: Number(countRooms),
    countGuests: Number(countGuests),
    price: Number(price),
    goods: goods.split(';') as Goods[],
    user: user,
    location: {
      latitude: Number(latitude),
      longitude: Number(longitude)
    } as Location,
  };
}
