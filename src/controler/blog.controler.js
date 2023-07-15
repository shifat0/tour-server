const BlogService = require("../service/blogService");
const { ERROR, OK } = require("../utils/responseHelper");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogService.getAllBlogs();
    if (blogs.message) return ERROR(res, [], blogs.message);
    return OK(res, blogs, "All blogs");
  } catch (err) {
    ERROR(res, [], "Error while getting all blogs");
  }
};

exports.getBlogByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const blog = await BlogService.getBlogByEmail(email)
    if (blog.message) return ERROR(res, [], blog.message);
    return OK(res, blog, "Blog found");
  } catch (err) {
    ERROR(res, [], "Error while getting all blogs");
  }
};

exports.getABlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogService.getABlog(id);
    if (blog.message) return ERROR(res, [], blog.message);
    return OK(res, blog, "Blog found");
  } catch (err) {
    ERROR(res, [], "Error while getting a blog");
  }
};

exports.createANewBlog = async (req, res) => {
  try {
    const { blog } = req.body;
    const newBlog = await BlogService.createANewBlog(blog);
    if (newBlog.message) return ERROR(res, [], newBlog.message);
    return OK(res, newBlog, "Blog created successfully");
  } catch (err) {
    ERROR(res, [], "Error while creating a blog");
  }
};

exports.updateABlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { blog } = req.body;
    const update = await BlogService.updateABlog(id, blog);
    if (update.message) return ERROR(res, [], update.message);
    return OK(res, update, "Blog updated successfully");
  } catch (err) {
    ERROR(res, [], "Error while updating a blog");
  }
};

exports.deleteABlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBlog = await BlogService.deleteABlog(id);
    if (deleteBlog.message) return ERROR(res, [], deleteBlog.message);
    return OK(res, deleteBlog, "Blog deleted successfully");
  } catch (err) {
    ERROR(res, [], "Error while deleting a blog");
  }
};
