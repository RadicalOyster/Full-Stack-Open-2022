const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1, id: 1 })
    .populate(["comments"]);
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: [],
    user: req.token.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.post("/:id/comments", async (req, res) => {
  const user = req.user;
  console.log(user)

  if (!user) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const body = req.body;
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(400);
  }

  const comment = new Comment({
    content: body.content,
    blog: req.params.id,
  });

  const savedComment = await comment.save();

  blog.comments.push(savedComment);
  const savedBlog = await blog.save();

  res.status(201).json({ comment: savedComment, blog: savedBlog });
});

blogsRouter.delete("/:id", async (req, res) => {
  const blogToRemove = await Blog.findById(req.params.id);
  if (req.user && blogToRemove.user.toString() === req.user.id.toString()) {
    await blogToRemove.remove();
    res.status(204).end();
  } else {
    return res.status(401).json({ error: "unathorized request" });
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const { likes } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true, runValidators: true, context: "query" }
  );

  res.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
