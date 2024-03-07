import dbClient from "../utils/dbClient";
import bcrypt from "bcrypt";

export default class User {  

static fromDb(user) {
  return new User(
    user.id,
    user.userName,
    user.password,
    user.email,
    user.role,
    user.profile?.firstName,
    user.profile?.lastName
  );
}

    static async fromJson(json) {
        const { firstName,
            lastName,
            userName,
            password,
            email,
            role,
        } = json;
        const hashedPassword = await bcrypt.hash(json.password, 10);
        return new User(
            null,
            firstName,
            lastName,
            userName,
            hashedPassword,
            email,
            role,
        );
    }

    constructor(
        id,
        userName,
        passwordHash,
        email,
        role ,
        firstName,
        lastName
    ) {
        this.id = id;
        this.userName = userName;
        this.passwordHash = passwordHash;
        this.email = email;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    toJson() {
        return {
            user: {
                id: this.id,
                firstName: this.firstName,
                lastName: this.lastName,
                userName: this.userName,
                email: this.email,
                role: this.role,
            },
        };
    }
    async save() {
        const data = {
            userName: this.userName,
            email: this.email,
            password: this.passwordHash,
            role: this.role
        }
        if (this.firstName && this.lastName) {
            data.profile = {
                create: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                }
            }
        }
        const createdUser = await dbClient.user.create({
            data,
            include: {
                profile: true
            }
        })
        return User.fromDb(createdUser)
    }
}