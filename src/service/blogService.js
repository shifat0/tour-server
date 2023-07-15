const { db } = require("../database/connection");

exports.createANewBlog = async (blog) => {
  try {
    const newBlog = await db.Blog.create(blog);
    return newBlog;
  } catch (err) {
    return err;
  }
};

exports.getAllBlogs = async () => {
  try {
    const blogs = await db.Blog.find({}).populate({
      path: "author",
      select: {
        firstName: 1,
        email: 1,
      },
    });
    return blogs;
  } catch (err) {
    return err;
  }
};

exports.getABlog = async (id) => {
  try {
    const blog = await db.Blog.findById(id).populate({
      path: "author",
      select: {
        firstName: 1,
        email: 1,
      },
    });
    return blog;
  } catch (err) {
    return err;
  }
};
exports.getBlogByEmail = async (email) => {
  try {
    const user = await db.User.findOne({ email: email });
    if (!user) {
      return null;
    }
    const blog = await db.Blog.find({ createdBy: user._id });

    return blog;
  } catch (err) {
    return err;
  }
};


exports.updateABlog = async (id, blog) => {
  try {
    const update = await db.Blog.findByIdAndUpdate(id, blog);
    return update;
  } catch (err) {
    return err;
  }
};

exports.deleteABlog = async (id) => {
  try {
    const deleted = await db.Blog.findByIdAndDelete(id);
    return deleted;
  } catch (err) {
    return err;
  }
};
