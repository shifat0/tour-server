const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    status: {
      type: String,
      enum: ["pending", "published"],
      default: "pending",
    },
    createdBy: { type: mongoose.SchemaTypes.ObjectId },
  },
  {
    timestamps: false,
    versionKey: false,
    id: false,
  }
);

blogSchema.virtual("author", {
  ref: "user",
  localField: "createdBy",
  foreignField: "_id",
});

blogSchema.set("toObject", { virtuals: true });
blogSchema.set("toJSON", { virtuals: true });

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
