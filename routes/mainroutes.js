import express from 'express';
import { homepage, authenticate, signup, signin, signout, refreshToken } from '../controllers/rootController.js';

const route = express.Router();

route.get("/", homepage);
route.get("/login", authenticate);
route.get("/register", authenticate);
route.post("/sign-up", signup);
route.post("/sign-in", signin);
route.get("/sign-out", signout);
route.get("/refresh-token", refreshToken);

export default route;