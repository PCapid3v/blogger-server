import bcrypt from "bcrypt";
import dbClient from "../utils/dbClient.js"; 
export default class User {
  constructor(id, userName, passwordHash, email, role, firstName, lastName) {
    this.id = id;
    this.userName = userName;
    this.passwordHash = passwordHash;
    this.email = email;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
  }

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
    const { userName, password, email, role, firstName, lastName } = json;
    const hashedPassword = await bcrypt.hash(password, 10);
    return new User(
      null,
      userName,
      hashedPassword,
      email,
      role,
      firstName,
      lastName
    );
  }

  toJson() {
    return {
      id: this.id,
      userName: this.userName,
      email: this.email,
      role: this.role,
      profile: {
        firstName: this.firstName,
        lastName: this.lastName,
      },
    };
  }

  async save() {
    const data = {
      userName: this.userName,
      email: this.email,
      password: this.passwordHash,
      role: this.role,
    };

    if (this.firstName && this.lastName) {
      data.profile = {
        create: {
          firstName: this.firstName,
          lastName: this.lastName,
        },
      };
    }

    const createdUser = await dbClient.user.create({
      data,
      include: {
        profile: true,
      },
    });
    return User.fromDb(createdUser);
  }
  static async findAll() {
    const users = await dbClient.user.findMany({
      include: {
        profile: true,
      },
    });
    return users.map((user) => User.fromDb(user));
  }
  static async findById(id) {
    const foundUser = await dbClient.user.findUnique({
      where: {
        id,
      },
    });
    if (foundUser) {
      return foundUser;
    }
    return null;
  }

  static async findByEmail(email) {
    const foundUser = await dbClient.user.findUnique({
      where: {
        email,
      },
    });
    if (foundUser) {
      return foundUser;
    }
    return null;
  }
  static async createProfileDb(userId, json) {
    const data = {
      firstName: json.firstName,
      lastName: json.lastName,
    };
    const createdUser = await dbClient.user.update({
      where: {
        id: userId,
      },
      data,
      include: {
        profile: true,
      },
    });

    return User.fromDb(createdUser);
  }
}