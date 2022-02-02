const express = require('express');
const blogController = require('../controllers/blogController');

const route = express.Router();

route.get('/', blogController.homepage);
route.get('/blogs', blogController.allBlogs);
route.get("/blog/create", blogController.createBlog);
route.post("/blog/create", blogController.createBlogPost);
route.get("/blog/:id", blogController.singleBlog);
route.get("/delete/:id", blogController.deleteBlog);


module.exports = route;