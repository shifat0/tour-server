const express = require("express");
const router = express.Router();
const BlogController = require("../../controler/blog.controler");

router.post("/create", BlogController.createANewBlog);
router.put("/update/:id", BlogController.updateABlog);
router.delete("/delete/:id", BlogController.deleteABlog);
router.get("/all", BlogController.getAllBlogs);
router.get("/all/:email", BlogController.getBlogByEmail);
router.get("/:id", BlogController.getABlog);

module.exports = router;
