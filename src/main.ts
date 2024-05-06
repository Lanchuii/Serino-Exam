import express, { json } from "express";
import { initDb } from "./db/database.js";
import { treasureRoutes } from "./routes/treasureRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";

const app = express().use(json());
app.use('/treasure', treasureRoutes);
app.use('/user', userRoutes);

export const PORT = 3000;
export const JWTSecret = "jwt_secret"

initDb();

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`)
})