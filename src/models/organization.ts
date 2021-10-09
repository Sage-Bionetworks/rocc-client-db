import { ObjectId, Schema } from 'mongoose';
import { Account, AccountModel, AccountType } from './account';
import validator from 'validator';

interface Organization extends Account {
  email: string;
  name: string;
  avatarUrl?: string;
  websiteUrl?: string;
  description?: string;
}

const OrganizationSchema = new Schema<Organization>({
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'invalid email'],
  },
  name: { type: String, required: true },
  avatarUrl: { type: String, validate: [validator.isURL, 'invalid avatarUrl'] },
  websiteUrl: {
    type: String,
    validate: [validator.isURL, 'invalid websiteUrl'],
  },
  description: { type: String },
});

export const OrganizationModel = AccountModel.discriminator<Organization>(
  AccountType.Organization,
  OrganizationSchema
);
