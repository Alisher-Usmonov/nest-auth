import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/config/constants";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions:{
          expiresIn: "1y"
        }
      })
],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule {}