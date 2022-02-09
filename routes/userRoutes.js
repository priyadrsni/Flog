import express from 'express';
import { getMyprofile, getMyrecipes } from '../controllers/userController.js';

const route = express.Router();

route.get("/profile", getMyprofile);
route.get('/my-blogs', getMyrecipes);

export default route;