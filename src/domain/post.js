import dbClient from "../utils/dbClient.js";

export default class Post {
    constructor(
        id,
        title,
        content,
        published,
        category,
        author,
        authorId,
        upvoters,
        downvoters,
        createdAt,
        updatedAt
    ) {
        this.id = id;
        this.title = title;
        this.content = content || null;
        this.published = published;
        this.category = category || "Uncategorized";
        this.author = author || null;
        this.authorId = authorId || null;
        this.upvoters =upvoters || [];
        this.downvoters =downvoters || [];
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    static async create(title, content, published,category, author, authorId, upvoters) {
        const newPost = new Post(
            null,
            title,
            content,
            published,
            category,
            author,
            authorId,
            upvoters,
            new Date(),
            new Date()
        );
        const createdPost = await dbClient.post.create({
            data: newPost,
        });
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
            await dbClient.upvoters.create(upvoteData);
        }
    }
}