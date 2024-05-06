import express from 'express';
import userLogin from '../auth/userLogin.js';
import userVerify from '../auth/userVerify.js';
import middleware from '../auth/middleware.js';

export const userRoutes = express.Router();

userRoutes.post("/login", (req, res) => {
  const { email, password } = req.body;
  const S400 = res.status(400);

  // Validate required fields
  if (typeof email !== "string") return S400.send("Invalid.");
  if (typeof password !== "string") return S400.send("Invalid password.");

  try {
    const token = userLogin(email, password);
    res.json({ token });
  } catch (e) {
    S400.send(e);
  }
});

userRoutes.get("/", middleware, (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]!;
  const user = userVerify(token);
  res.json({ id: user.id, name: user.name, age: user.age, email: user.email });
});