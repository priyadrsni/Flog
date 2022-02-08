import "dotenv/config";
import express, { urlencoded } from "express";
import mainRoutes from "./routes/mainRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectBlog from "./config/blog.js";
import cookieParser from "cookie-parser";
import auth from "./middleware/auth.js";
import getUser from "./middleware/getUser.js";
import User from "./models/userdb.js";
import Blog from "./models/database.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

connectBlog();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

app.use(auth);
app.use(getUser);

app.use(mainRoutes);
app.use(blogRoutes);
app.use(userRoutes);

app.get("/update", async (req, res) => {
  User.find({}, (err, datas) => {
    datas.forEach(async (data) => {
      console.log(data.username);
      const blogs = await Blog.find({ author_name: data.username });
      blogs.forEach((blog) => {
        blog.user_id = data._id;
        blog.save();
      });
    });
  });
  res.send("success");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is up and running in port http://localhost:${port}`);
});
