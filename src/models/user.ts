import { Schema } from 'mongoose';
import { AccountModel } from './account';

interface User {
  login: string;
}

const options = {
  discriminatorKey: 'type',
  collection: 'account',
};

const UserSchema = new Schema<User>(
  {
    login: { type: String, required: true },
  },
  options
);

export const UserModel = AccountModel.discriminator('User', UserSchema);
