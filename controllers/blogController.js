const Blog = require('../models/database');

const homepage = async (req, res) => {
    const blogs = await Blog.find().sort({createdAt: -1}).limit(3);
    res.render("home", { title: "Homepage", blogs });
}

const allBlogs = async (req, res) => {
    const blogs = await Blog.find().sort({createdAt: -1});
    res.render('blogs/allBlogs', { title: "All blogs", blogs })
}

const createBlog = async (req, res) => {
    res.render('blogs/create', { title: "Create new blog" });
}

const createBlogPost = async (req, res) => {
    const { title, body, keywords } = req.body;
    try {
        const newBlog = new Blog({
            title,
            body,
            keywords
        });
    
        await newBlog.save();
        res.status(200).json({ status: "success" });
    }

    catch (err) {
        console.log(err);
        res.status(401).json({ status: "failure" });
    }
}

const singleBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('blogs/singleBlog', { title: blog.title, blog });
}

const deleteBlog = async (req, res) => {
    const blog = await Blog.deleteOne({ _id: req.params.id });
    res.redirect('/blogs');
}

module.exports = {
    homepage,
    allBlogs,
    createBlog,
    createBlogPost,
    singleBlog,
    deleteBlog
}