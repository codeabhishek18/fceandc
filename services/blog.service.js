import { Blog } from "@/models/blog.model";

class blogService
{
    async addBlog(id, title, coverImage, keywords, readTime, sections, youTubeURL)
    {
        try
        {
            const newBlog = await Blog.create({id, title, coverImage, keywords, readTime, sections, youTubeURL});
            await newBlog.save();
            return newBlog
        }
        catch(error)
        {
            throw error
        }
    }

    async getAllBlogs()
    {
        try
        {
            const blogs = await Blog.find({});
            return blogs
        }
        catch(error)
        {
            throw error
        }
    }

    async getBlogById(id)
    {
        try
        {
            const blog = await Blog.findOne({id});
            return blog
        }
        catch(error)
        {
            throw error
        }
    }
}

export default blogService