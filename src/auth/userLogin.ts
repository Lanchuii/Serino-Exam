import jwt from "jsonwebtoken";
import { db } from "../db/database.js";
import User from "../models/user.js";
import { JWTSecret } from "../main.js";

export default function userLogin(email: string, password: string) {
  const user = db.prepare("SELECT id, password FROM USERS WHERE email = ?").get(email) as User;
  if (!user) throw "Email is not registered.";

  if (password !== user.password) throw "Password is incorrect.";

  const token = jwt.sign(String(user.id), JWTSecret);

  return token;
}