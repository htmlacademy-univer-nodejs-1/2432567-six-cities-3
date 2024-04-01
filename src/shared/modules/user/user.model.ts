import { Document, model, Schema } from 'mongoose';
import { User } from '../../types.js';
import { UserType } from '../../const.js';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Min length for name is 2']
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
    minlength: [5, 'Min length for avatar path is 5'],
  },
  password: String,
  type: UserType,
}, {timestamps: true});

export const UserModel = model<UserDocument>('User', userSchema);
