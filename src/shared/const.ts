enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

enum CityCoordinates {
  Paris = '48.85661;2.351499',
  Cologne = '50.938361;6.959974',
  Brussels = '50.846557;4.351697',
  Amsterdam = '52.370216;4.895168',
  Hamburg = '53.550341;10.000654',
  Dusseldorf = '53.550341;10.000654'
}

enum Facilities {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

enum HouseType {
  apartment = 'apartment',
  house = 'house',
  room = 'room',
  hotel = 'hotel'
}

enum UserType {
  pro = 'pro',
  usual = 'usual'
}

export { City, CityCoordinates, Facilities, HouseType, UserType };
