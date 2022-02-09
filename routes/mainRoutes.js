import express from 'express';
import { getHomepage, getAuthentication, getSignup, getSignin, getSignout, getRefreshToken } from '../controllers/rootController.js';

const route = express.Router();

route.get("/", getHomepage);
route.get("/login", getAuthentication);
route.get("/register", getAuthentication);
route.post("/sign-up", getSignup);
route.post("/sign-in", getSignin);
route.get("/sign-out", getSignout);
route.get("/refresh-token", getRefreshToken);

export default route;
