import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Schema({
    timestamps : true
})

export class User {
 @Prop()
 fullname : string

 @Prop()
 username : string

 @Prop()
 email : string

 @Prop()
 password : string

 @Prop({
    type: Array,
    enum: Object.values(UserRole),
    default: [UserRole.USER],
  })
  roles: [];
};

export const UserSchema = SchemaFactory.createForClass(User);