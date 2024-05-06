import jwt from "jsonwebtoken";
import { JWTSecret } from "../main.js";
import { db } from "../db/database.js";
import User from "../models/user.js";

export default function userVerify(token: string) {
  const userId = jwt.verify(token, JWTSecret);

  const user = db.prepare("SELECT * FROM USERS WHERE id = ?").get(userId) as User;
  if (!user) throw "User does not exist.";

  return user;
}