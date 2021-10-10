import { model, ObjectId, Schema } from 'mongoose';
import validator from 'validator';

export enum ChallengeStatus {
  Active = 'active',
  Upcoming = 'upcoming',
  Completed = 'completed',
}

export interface Challenge {
  _id: ObjectId;
  name: string;
  displayName: string;
  description: string;
  fullName?: string; // TODO make required after fixing production JSON
  ownerId: ObjectId;
  websiteUrl?: string;
  status: ChallengeStatus;
  startDate?: Date;
  endDate?: Date;
  platformId: ObjectId;
  topics?: string[];
  doi?: string;
  createdAt: Date;
  updatedAt: Date;
}

const options = {
  collection: 'challenge',
  timestamps: true,
};

export const ChallengeSchema = new Schema<Challenge>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    displayName: { type: String, minlength: 3, maxlength: 60, required: true },
    description: { type: String, minlength: 3, maxlength: 280, required: true },
    fullName: { type: String }, // TODO make required and unique after fixing production JSON
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    websiteUrl: {
      type: String,
      validate: [validator.isURL, 'invalid websiteUrl'],
    },
    status: { type: String, enum: ChallengeStatus, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    platformId: {
      type: Schema.Types.ObjectId,
      ref: 'ChallengePlatform',
      required: true,
    },
    topics: { type: [String], default: [] },
    doi: { type: String },
  },
  options
);

export const ChallengeModel = model('Challenge', ChallengeSchema);
