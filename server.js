const express = require("express");
const app = express();

app.use(express.json());

// In-memory database
let posts = [
  {
    id: 1,
    title: "Welcome",
    content: "My first blog post",
    author: "Admin"
  }
];

// Home
app.get("/", (req, res) => {
  res.send("RESTful Blog API is Running!");
});

// GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET single post
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);

  if (!post)
    return res.status(404).json({ message: "Post not found" });

  res.json(post);
});

// CREATE post
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author)
    return res.status(400).json({
      message: "Title, Content and Author are required"
    });

  const post = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content,
    author
  };

  posts.push(post);

  res.status(201).json({
    message: "Post Created",
    post
  });
});

// UPDATE post
app.put("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);

  if (!post)
    return res.status(404).json({ message: "Post not found" });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  post.author = req.body.author || post.author;

  res.json({
    message: "Post Updated",
    post
  });
});

// DELETE post
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex(p => p.id == req.params.id);

  if (index === -1)
    return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);

  res.json({
    message: "Post Deleted"
  });
});

// Server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
