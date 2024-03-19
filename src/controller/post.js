import Post from "../domain/post.js";
import { sendDataResponse } from "../utils/responses.js";

export const create = async (req, res) => {
  const { content } = req.body;
  const userId = Number(req.user.id);

  if (!content) {
    return sendDataResponse(res, 400, { content: "Must provide content" });
  }

  try {
    const post = await Post.create(content, userId);
    return sendDataResponse(res, 201, post);
  } catch (e) {
    console.error("error creating post", e.message);
    return sendDataResponse(res, 500, "something went wrong");
  }
};

export const getPostById = async (req, res) => {
  const postId = Number(req.params.id);

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
  const posts = await Post.getAll();
  return sendDataResponse(res, 200, { posts });
};

export const deletePost = async (req, res) => {
  const postId = Number(req.params.id);

  const deletedPost = await Post.deleteById(postId);

  return sendDataResponse(res, 200, deletedPost);
};


