import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { ROLES } from 'src/common/constants/role.enum';

@Schema()
class User {
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ required: true })
  hash: string;
  @Prop({ required: true, default: ROLES.USER })
  role: ROLES;
  @Prop({ default: new Date(Date.now()) })
  createdAt: Date;
  @Prop({ default: new Date(Date.now()) })
  updatedAt: Date;
}

export type UserDocument = User & Document;
export type UserModel = Model<User>;
export const UserSchema = SchemaFactory.createForClass(User);
