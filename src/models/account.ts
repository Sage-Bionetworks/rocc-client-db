import { Schema, model } from 'mongoose';

interface Account {
  login: string;
}

const AccountSchema = new Schema<Account>(
  {
    login: { type: String, required: true }
  },
  { collection: 'account' }
);

export const AccountModel = model('Account', AccountSchema);
