import { model, ObjectId, Schema } from 'mongoose';

export enum AccountType {
  USER = 'User',
  ORGANIZATION = 'Organization',
}

export interface Account {
  _id: ObjectId;
  login: string;
  type: AccountType;
  createdAt: Date;
  updatedAt: Date;
}

const options = {
  discriminatorKey: 'type',
  collection: 'account',
  timestamps: true,
};

const AccountSchema = new Schema<Account>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    login: { type: String, required: true },
    type: { type: String, enum: AccountType },
  },
  options
);

export const AccountModel = model('Account', AccountSchema);
