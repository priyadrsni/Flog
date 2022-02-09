import express from 'express';
import { getAllBlogs, getCreateBlog, postCreateBlog, getUpdateBlog, postUpdateBlog, getSingleBlog, postDeleteBlog } from '../controllers/blogController.js';

const route = express.Router();

route.get('/blogs', getAllBlogs);
route.get("/blog/create", getCreateBlog);
route.post("/blog/create", postCreateBlog);
route.get("/update/:id", getUpdateBlog);
route.post("/update/:id", postUpdateBlog);
route.get("/blog/:id", getSingleBlog);
route.get("/delete/:id", postDeleteBlog);

export default route;