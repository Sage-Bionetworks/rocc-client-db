import { model, ObjectId, Schema } from 'mongoose';

export enum AccountType {
  User = 'User',
  Organization = 'Organization',
}

export interface Account {
  _id: ObjectId;
  login: string;
  type: AccountType;
  createdAt: Date;
  updatedAt: Date;
}

const options = {
  discriminatorKey: '_cls',
  collection: 'account',
  timestamps: true,
};

const AccountSchema = new Schema<Account>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    login: { type: String, required: true },
    type: { type: String, enum: AccountType, required: true },
  },
  options
);

console.log('create account model');
export const AccountModel = model('Account', AccountSchema);
