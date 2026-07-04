import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import TagBadge from "../../components/TagBadge";
import CommentCard from "../../components/CommentCard";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!id) return;

    //  Replace with GET /posts/:id when backend is integrated

    const samplePost = {
      id,
      title: "React Basics",
      author: "Namrata",
      content:
        "React is a JavaScript library used for building user interfaces. It helps developers create reusable UI components and build modern web applications.",
      tags: ["React", "JavaScript"],
      likes: 10,
      commentCount: 2,
    };

    //  Replace with GET /comments when backend is available
    const sampleComments = [
      {
        id: 1,
        username: "John",
        text: "Great article!",
        createdAt: "2 hours ago",
      },
      {
        id: 2,
        username: "Sarah",
        text: "Very helpful!",
        createdAt: "5 minutes ago",
      },
    ];

    setPost(samplePost);
    setComments(sampleComments);
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !commentText.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    //  POST comment to backend

    alert("Comment submitted successfully!");

    setUsername("");
    setCommentText("");
  };

  if (!post) {
    return (
      <Layout>
        <p>Loading post...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>{post.title}</h1>

      <p>
        <strong>Author:</strong> {post.author}
      </p>

      <p> {post.likes} Likes</p>

      <div style={{ marginBottom: "20px" }}>
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>

      {/* Backend currently doesn't return content */}
      {post.content && <p>{post.content}</p>}

      <hr />

      <h2>Comments ({comments.length})</h2>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            username={comment.username}
            text={comment.text}
            createdAt={comment.createdAt}
          />
        ))
      )}

      <hr />

      <h3>Add a Comment</h3>

      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <br />

        <textarea
          rows="4"
          placeholder="Write your comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Submit Comment
        </button>
      </form>
    </Layout>
  );
}