import User from "../domain/user.js";
import { sendDataResponse, sendMessageResponse } from "../utils/responses.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createUser = async (req, res) => {
    const userToCreate = await User.fromJson(req.body);
    console.log(userToCreate)

    try {
        const existingUser = await User.findByEmail(userToCreate.email);
        if (existingUser) {
            return sendDataResponse(res, 400, {
                message: "User already exists",
            });
        }
        const createdUser = await userToCreate.save();
        return sendDataResponse(res, 201, createdUser);
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            return sendDataResponse(res, 400, {
                message: "Email already exists",
            });
        }
        return sendDataResponse(res, 500, {
            message: err.message,
        });
        console.log(err)
    }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users.map((user) => user.toJson()));
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getById = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const foundUser = await User.findById(id);
        if (!foundUser) {
            return sendDataResponse(res, 404, { error: "User not found" });
        }
        return sendDataResponse(res, 200, foundUser);
    } catch (err) {
        return sendDataResponse(res, 500, { error: "Unable to get user" });
    }
}

export const createProfile = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findByEmail(email);

    if (!existingUser) {
      return sendDataResponse(res, 404, { error: "User not found" });
    }

    const profile = await User.createProfileDb(existingUser.id, req.body);
    return sendDataResponse(res, 201, { profile });
  } catch (e) {
    return sendMessageResponse(res, 500, "Unable create user profile");
    }
};

