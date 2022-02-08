import express from 'express';
import { allBlogs, createBlog, createBlogPost, singleBlog, deleteBlog } from '../controllers/blogController.js';

const route = express.Router();

route.get('/blogs', allBlogs);
route.get("/blog/create", createBlog);
route.post("/blog/create", createBlogPost);
route.get("/blog/:id", singleBlog);
route.get("/delete/:id", deleteBlog);

export default route;