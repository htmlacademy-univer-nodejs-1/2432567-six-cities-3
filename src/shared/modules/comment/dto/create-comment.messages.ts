export const CreateCommentValidationMessage = {
  comment: {
    minLength: 'Minimum comment length must be 10',
    maxLength: 'Maximum comment length must be 100',
  },
  offerId: {
    invalidId: 'OfferId field must be a valid id',
  },
  userId: {
    invalidId: 'UserId field must be a valid id',
  },
} as const;
