import dbClient from "../utils/dbClient.js";

export default class Post {
  constructor(
    id,
    title,
    content,
    cover,
    published,
    category,
    subCategory,
    authorAvatar,
    authorId,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.title = title;
    this.content = content || null;
    this.cover =
      cover ||
      "https://plus.unsplash.com/premium_photo-1710962184944-71cab934b562?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    this.published = published;
    this.category = category || "Uncategorized";
    this.subCategory = subCategory || null;
    this.authorAvatar =
      authorAvatar ||
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-1024.png";
    this.authorId = authorId || null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  static async create(
    title,
    content,
    published,
    category,
    subCategory,
    cover,
    authorAvatar,
    authorId
  ) {
    const defaultCover =
      "https://plus.unsplash.com/premium_photo-1710962184944-71cab934b562?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const defaultAvatar =
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-1024.png";
    const newPost = {
      title,
      content,
      cover: cover || defaultCover,
      published,
      category,
      subCategory,
      authorAvatar: authorAvatar || defaultAvatar,
      authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createdPost = await dbClient.post.create({ data: newPost });
    return createdPost;
  }

  static async updateById(id, title, content, published, author, authorId) {
    const updatedPost = await dbClient.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
        published: published,
        author: author,
        authorId: authorId,
        updatedAt: new Date(),
      },
    });
    return updatedPost;
  }

  static async deleteById(id) {
    const deletedPost = await dbClient.post.delete({
      where: {
        id: id,
      },
    });
    return deletedPost;
  }

  static async findById(id) {
    const foundPost = await dbClient.post.findUnique({
      where: {
        id: id,
      },
    });
    if (foundPost) {
      return foundPost;
    }
    return null;
  }

  static async getAll() {
    const allPosts = await dbClient.post.findMany({
      where: {
        published: true,
      },
    });
    if (allPosts) {
      return allPosts;
    }
    return null;
  }

  static async toggleUpvote(postId, userId = null) {
    const filter = userId
      ? { AND: [{ postId: postId }, { votedBy: userId }] }
      : { postId: postId };
    const existingUpvote = await dbClient.upvoters.findUnique({
      where: filter,
    });

    if (existingUpvote) {
      await dbClient.upvoters.delete({
        where: {
          id: existingUpvote.id,
        },
      });
      return "Upvote removed successfully.";
    } else {
      const upvoteData = { post: { connect: { id: postId } } };
      if (userId) upvoteData.votedBy = userId;
      await dbClient.upvoters.create({ data: upvoteData });
      return "Upvote added successfully.";
    }
  }
}
