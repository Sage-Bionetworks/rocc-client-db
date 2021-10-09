import { ObjectId, Schema } from 'mongoose';
import { AccountModel } from './account';
import validator from 'validator';

interface Organization {
  _id: ObjectId;
  login: string;
  name: string;
  email: string;
}

const options = {
  discriminatorKey: 'type',
  collection: 'account',
};

const OrganizationSchema = new Schema<Organization>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    login: { type: String, required: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, 'invalid email'],
    },
  },
  options
);

export const OrganizationModel = AccountModel.discriminator<Organization>(
  'Organization',
  OrganizationSchema
);
