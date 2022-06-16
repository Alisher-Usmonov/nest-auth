import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    async create(data) {
        return await this.userModel.create(data);
    }

    async findOne(username) {
        return await this.userModel.findOne({
            username
        })
    }
}