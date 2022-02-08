import Blog from '../models/database.js';

export const myprofile = async (req, res) => {
    const blogs = await Blog.find({ 'user_id': req.user._id});
    if(!req.user) {
        res.redirect('/login');
    }
    res.render("user/my-profile", {title: "Profile", user: req.user ? req.user : null, blogs});
}

export const myrecipes = async (req, res) => {
    const blogs = await Blog.find({ 'user_id': req.user._id});
    console.log('id', req.user);
    res.render('user/my-recipes', { title: "My Recipes", blogs, user: req.user ? req.user : null })
}