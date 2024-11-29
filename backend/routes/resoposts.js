const express = require("express");
const router = express.Router();
const ResoComment = require("../models/ResoComment");
const ResoPost = require("../models/ResoPost"); // Import the ResoPost model
const User = require("../models/User"); // Import User model
const pluralize = require("pluralize");

// Route for creating a new post
router.post("/create", async (req, res) => {
  try {
    // Creating a new post instance using the ResoPost model
    const newPost = new ResoPost({
      ...req.body,
    });

    // Saving the new post to the database
    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route for updating an existing post
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await ResoPost.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for deleting a post by its ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the post
    const deletedPost = await ResoPost.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete associated comments with the deleted post
    await ResoComment.deleteMany({ postId: id });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Route for retrieving details of a post by its ID
router.get("/:id", async (req, res) => {
  try {
    const post = await ResoPost.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for retrieving all posts of a specific user by their user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await ResoPost.find({ postedBy: req.params.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for retrieving all posts, optionally filtered by a search query
router.get("/", async (req, res) => {
  const query = req.query;
  try {
    let searchFilter = {};

    if (query.search) {
      const pattern = new RegExp(
        `\\b(${query.search}|${pluralize.singular(query.search)}|${pluralize.plural(query.search)})\\b`,
        "i"
      );

      searchFilter = {
        title: { $regex: pattern },
      };
    }

    const posts = await ResoPost.find(searchFilter);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a rating to a post
router.post("/:postId/rate", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, rating } = req.body;

    const post = await ResoPost.findById(postId);

    const existingRating = post.ratings.find(
      (r) => r.userId.toString() === userId
    );
    if (existingRating) {
      existingRating.rating = rating; // Update existing rating
    } else {
      post.ratings.push({ userId, rating }); // Add new rating
    }

    await post.save();

    const averageRating = post.calculateAverageRating();
    res.status(200).json({ ...post.toObject(), averageRating });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id/user-rating/:userId", async (req, res) => {
  try {
    const { id: postId, userId } = req.params;
    const post = await ResoPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userRating = post.ratings.find(
      (rating) => rating.userId.toString() === userId
    );
    res.json(userRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Exporting the router to make it available for use in other files
module.exports = router;
