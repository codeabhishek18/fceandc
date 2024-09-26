import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    id:
    {
        type: String,
        required: true
    },
    title: 
    {
        type: String,
        required: true
    },
    coverImage: 
    {
        type: String,
        required: true
    },
    keywords:
    {
        type: [String],
        required: true
    },
    readTime:
    {
        type: String,
        required: true
    },
    sections:
    {
        type: [Schema.Types.Mixed],
        required: true
    },
    youTubeURL: String
}, {timestamps: true})

export const Blog = mongoose.models?.Blog || mongoose.model('Blog', blogSchema);