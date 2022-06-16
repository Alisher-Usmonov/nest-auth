import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidV4 } from "uuid";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ default: uuidV4(), unique: true })
    id: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, minlength: 6 })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);