import Blog from '../models/database.js';
import User from '../models/userdb.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getHomepage = async (req, res) => {
    if(res.locals.error) {
        console.log("error", res.locals.error)
        res.redirect('/login');
    }
    
    else if(req.user) {
        const user = req.user;
        const blogs = await Blog.find().sort({createdAt: -1}).limit(4);
        const userblogs = await Blog.findOne({user_id: user._id});
        res.render("userhome", { title: user.username, blogs, user, userblogs});
    }
    else {
        const blogs =  await Blog.find().sort({createdAt: -1}).limit(4);
        console.log("No token", req.headers["x-access-token"]);
        res.render("home", {title: "Homepage", blogs});
    }
    
}

export const getAuthentication = async (req, res) => {
    res.render("authenticate", { title: "Sign in" });
}

export const getSignup = async (req, res) => {
    try {
        const {name, email, pwd} = req.body;

        if(!(name && email && pwd)) {
            res.status(400).send("All inputs are required.");
        }

        const oldUser = await User.findOne({ email });

        if(oldUser) {
            return res.status(409).send("User alreasdy exists. Please login")
        }

        const encryptedPassword = await bcrypt.hash(pwd, 10);

        const user = await User.create({
            username: name,
            email: email.toLowerCase(),
            password: encryptedPassword
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        user.token = token;
        user.save();
        const userdata = {
            id: user._id,
            token: user.token
        }
        res.cookie('x-access-token', userdata);
        res.redirect('/');
    }
        catch (err) {
            console.log(err);
        }
    
};

export const getSignin =  async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!( username && password )) {
            res.status(400).send("All inputs are required.");
        }

        const user = await User.findOne({ username });

        if (!user) {
            res.status(400).send("User not found. Please register");
        }

        else if(user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                    { user_id: user._id, username },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
            
            user.token = token;
            const userdata = {
                id: user._id,
                token: user.token
            }
            res.cookie('x-access-token', userdata);
            res.redirect('/');
        }

        else if(user || (await bcrypt.compare(password, user.password))) {
            res.status(400).send("Invalid credentials")
        }
    }
    catch (err) {
        console.log(err);
    }
};

export const getSignout = (req, res) => {
    res.clearCookie("x-access-token");
    res.redirect('/');
}


export const getRefreshToken = async (req, res) => {
    try {
        const user = await User.findOne({username: req.cookies["x-access-token"].name});
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        user.token = token;
        console.log(user);
        const userdata = {
            name: user.username,
            token: user.token
        }
        res.cookie('x-access-token', userdata);
        res.send("Token refreshed successfully");
    }
    catch (err) {
        res.send(err);
    }

}