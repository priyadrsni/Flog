import Blog from '../models/database.js';

export const allBlogs = async (req, res) => {
    const blogs = await Blog.find().sort({createdAt: -1});
    res.render('blogs/allBlogs', { title: "Recipes", blogs, user: req.user ? req.user : null })
}

export const createBlog = (req, res) => {
    res.render('blogs/create', { title: "New blog", draft: undefined, user: req.user ? req.user : null });
}

export const createBlogPost = async (req, res) => {
    const { title, image, description, body, keywords, name } = req.body;
    try {
        const newBlog = new Blog({
            title,
            image,
            description,
            body,
            keywords,
            author_name: name,
        });
    
        await newBlog.save();
        res.status(200).redirect('/blogs');
    }

    catch (err) {
        console.log(err);
        res.redirect('blog/create', { title: "New blog", draft: req.body, user: req.user ? req.user : null });
    }
}

export const singleBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('blogs/singleBlog', { title: blog.title, blog, user: req.user ? req.user : null });
}

export const deleteBlog = async (req, res) => {
    const blog = await Blog.deleteOne({ _id: req.params.id });
    res.redirect('/blogs');
}

// module.exports = {
//     homepage,
//     authenticate,
//     allBlogs,
//     createBlog,
//     createBlogPost,
//     singleBlog,
//     deleteBlog
// }