import express from 'express';
import { myprofile, myrecipes } from '../controllers/userController.js';

const route = express.Router();

route.get("/profile", myprofile);
route.get('/my-blogs', myrecipes);

export default route;