import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: Array, required: true },
    keywords: { type: String },
    author_name: { type: String, required: true },
    user_id: {type: Object}
});

export default mongoose.model("blog", BlogSchema);