export const CreateCommentValidationMessage = {
  text: {
    minLength: 'Minimum text length must be 10',
    maxLength: 'Maximum text length must be 100',
  },
  offerId: {
    invalidId: 'OfferId field must be a valid id',
  },
  userId: {
    invalidId: 'UserId field must be a valid id',
  },
} as const;
