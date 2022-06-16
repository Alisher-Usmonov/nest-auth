import { genSalt, hash, compare } from "bcrypt";

export const hashPass = async (data) => {
    let salt = await genSalt(15);
    return await hash(data, salt);
}

export const compareHash = async (data, hash) => {
    return await compare(data, hash);
}