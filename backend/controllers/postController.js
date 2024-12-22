const Post = require("../models/postModel");
const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

// Get post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Error fetching post" });
  }
};

// Create new post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const gptResponse = await openai.complete({
      engine: "davinci",
      prompt: `Summarize the following blog content: \n${content}`,
      maxTokens: 50,
    });
    const summary = gptResponse.data.choices[0].text.trim();
    const newPost = new Post({ title, content, summary });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Error creating post" });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Error updating post" });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting post" });
  }
};