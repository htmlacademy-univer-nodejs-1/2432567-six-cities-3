export const CreateUserValidationMessages = {
  name: {
    invalidFormat: 'Name is required',
    lengthField: 'Min length is 1, max is 15'
  },
  email: {
    invalidFormat: 'Email must be a valid address'
  },
  avatarPath: {
    invalidFormat: 'AvatarPath is required',
  },
  password: {
    invalidFormat: 'Password is required',
    lengthField: 'Min length for password is 6, max is 12'
  },
} as const;
