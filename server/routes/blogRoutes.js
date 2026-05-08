const express = require("express");
const router = express.Router();

const Blog = require("../models/Blog");

router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ _id: -1 });
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.json(blog);
});

router.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedBlog);
});

router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

module.exports = router;