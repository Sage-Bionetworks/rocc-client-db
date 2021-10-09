import { model, ObjectId, Schema } from 'mongoose';
import { OrganizationSchema } from './organization';
import { UserSchema } from './user';

export enum OrgMembershipState {
  Active = 'active',
  Pending = 'pending',
}

export enum OrgMembershipRole {
  Admin = 'admin',
  Member = 'member',
}

export interface OrgMembership {
  _id: ObjectId;
  state: OrgMembershipState;
  role: OrgMembershipRole;
  organizationId: ObjectId;
  userId: ObjectId;
}

const options = {
  collection: 'org_membership',
};

export const OrgMembershipSchema = new Schema<OrgMembership>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    state: { type: String, enum: OrgMembershipState, required: true },
    role: { type: String, enum: OrgMembershipRole, required: true },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  options
);

export const OrgMembershipModel = model('OrgMembership', OrgMembershipSchema);
