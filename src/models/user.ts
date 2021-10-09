import { ObjectId, Schema } from 'mongoose';
import { AccountModel } from './account';
import validator from 'validator';

interface User {
  _id: ObjectId;
  login: string;
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
}

const options = {
  discriminatorKey: 'type',
  collection: 'account',
};

const UserSchema = new Schema<User>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    login: { type: String, required: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, 'invalid email'],
    },
    bio: { type: String },
    avatarUrl: { type: String, validate: [validator.isURL, 'invalid avatarUrl'] },
  },
  options
);

export const UserModel = AccountModel.discriminator<User>('User', UserSchema);
