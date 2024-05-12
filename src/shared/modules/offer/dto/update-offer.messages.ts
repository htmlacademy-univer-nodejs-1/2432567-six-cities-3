export const UpdateOfferValidationMessage = {
  title: {
    invalidFormat: 'Title must be a string',
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    invalidFormat: 'Description must be a number',
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  city: {
    invalidFormat:
      'Must be one of Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  },
  preview: {
    maxLength: 'Maximum preview length must be 1024',
  },
  photos: {
    invalidFormat: 'Must be an array',
  },
  isPremium: {
    invalidFormat: 'Must be boolean',
  },
  isFavorite: {
    invalidFormat: 'Must be boolean',
  },
  houseType: {
    invalidFormat: 'Must be one of Apartment, House, Room, Hotel',
  },
  countRooms: {
    invalidFormat: 'CountRooms must be a number',
    min: 'Minimum countRooms must be 1',
    max: 'Maximum countRooms must be 8',
  },
  countGuests: {
    invalidFormat: 'CountGuests must be a number',
    min: 'Minimum countGuests must be 1',
    max: 'Minimum countGuests must be 10',
  },
  price: {
    invalidFormat: 'Price must be a number',
    min: 'Minimum price must be 100',
    max: 'Maximum price must be 100000',
  },
  facilities: {
    invalidFormat: 'Must be an array',
    invalidElementFormat:
      'Element must be one of Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
  },
  authorId: {
    invalidId: 'AuthorId field must be a valid id',
  },
  coordinates: {
    invalidFormat: 'Location must be a valid object',
  },
} as const;
