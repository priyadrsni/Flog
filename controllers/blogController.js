import Blog from '../models/database.js';

export const getCreateBlog = (req, res) => {
    res.render('blogs/create', { title: "New blog", draft: undefined, user: req.user ? req.user : null });
}

export const postCreateBlog = async (req, res) => {
    const { title, image, description, body, keywords, name } = req.body;
    try {
        const newBlog = new Blog({
            title,
            image,
            description,
            body,
            keywords,
            author_name: name,
            user_id: req.user._id
        });
    
        await newBlog.save();
        res.status(200).redirect('/my-blogs');
    }

    catch (err) {
        console.log(err);
        res.redirect('blog/create', { title: "New blog", draft: req.body, user: req.user ? req.user : null });
    }
}

export const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find().sort({createdAt: -1});
    res.render('blogs/allBlogs', { title: "Recipes", blogs, user: req.user ? req.user : null })
}

export const getSingleBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('blogs/singleBlog', { title: blog.title, blog, user: req.user ? req.user : null });
}

export const getUpdateBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('blogs/create', { title: "New blog", draft: blog, user: req.user ? req.user : null });
}

export const postUpdateBlog = async (req, res) => {
    const { title, image, description, body, keywords, name } = req.body;
    const updatedBlog = {
        title,
        image,
        description,
        body,
        keywords,
        author_name: name,
    }
    try {
        Blog.findByIdAndUpdate(
            { _id: req.params.id },
            updatedBlog,
            {new: true},
            (err, data) => {
                const blog = data;
                console.log(blog);
                res.render('blogs/singleBlog', { title: blog.title, blog, user: req.user ? req.user : null });
            }
        )
    }

    catch (err) {
        console.log(err);
        res.redirect('blog/create', { title: "New blog", draft: updatedBlog, user: req.user ? req.user : null });
    }
}

export const postDeleteBlog = async (req, res) => {
    const blog = await Blog.deleteOne({ _id: req.params.id });
    res.redirect('/my-blogs');
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