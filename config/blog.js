import mongoose from 'mongoose';

const { MONGO_BLOG_URI } = process.env;

const connectBlog = () => {
    mongoose.connect(MONGO_BLOG_URI)
        .then((result) => {
            console.log("Successfully connected to blog database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
}

export default connectBlog;