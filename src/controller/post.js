import Post from "../domain/post.js";
import { sendDataResponse } from "../utils/responses.js";

export const create = async (req, res) => {
  const { title, content, published, category, cover,authorAvatar } = req.body;

  if (!title || !content) {
    return sendDataResponse(res, 400, {
      content: "Must provide title and content",
    });
  }

  try {
    const post = await Post.create(title, content, published, category, cover,authorAvatar);
    return sendDataResponse(res, 201, post);
  } catch (e) {
    console.error("Error creating post", e.message);
    return sendDataResponse(res, 500, "Something went wrong");
  }
};

export const getPostById = async (req, res) => {
  const postId = Number(req.params.id);

  if (isNaN(postId)) {
    return sendDataResponse(res, 400, "Invalid post ID");
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return sendDataResponse(res, 404, "Post not found");
    }

    return sendDataResponse(res, 200, post);
  } catch (e) {
    console.error("Error retrieving post", e.message);
    return sendDataResponse(res, 500, "Something went wrong");
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await Post.getAll();
    return sendDataResponse(res, 200, { posts });
  } catch (e) {
    console.error("Error retrieving posts", e.message);
    return sendDataResponse(res, 500, "Something went wrong");
  }
};

export const deletePost = async (req, res) => {
  const postId = Number(req.params.id);

  if (isNaN(postId)) {
    return sendDataResponse(res, 400, "Invalid post ID");
  }

  try {
    const deletedPost = await Post.deleteById(postId);

    if (!deletedPost) {
      return sendDataResponse(res, 404, "Post not found");
    }

    return sendDataResponse(res, 200, deletedPost);
  } catch (e) {
    console.error("Error deleting post", e.message);
    return sendDataResponse(res, 500, "Something went wrong");
  }
};
