import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import TagBadge from "../../components/TagBadge";
import CommentCard from "../../components/CommentCard";
import styles from "./post.module.css";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!id) return;

    //replace with GET:id

    const samplePost = {
      id,
      title: "React Basics",
      author: "Namrta",
      content:
        "React is a JavaScript library used for building user interfaces. It helps developers create reusable UI components and build modern web applications.",
      tags: ["React", "JavaScript"],
      likes: 10,
      commentCount: 2,
       coverImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
      createdAt: "2026-07-24T10:30:00Z",
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
    const newComment = {
      id: comments.length + 1,
      username,
      text: commentText,
      createdAt: "Just now",
    };

    setComments([newComment, ...comments]);


    alert("Comment submitted successfully!");

    setUsername("");
    setCommentText("");
  };

  if (!post) {
    return (
      <Layout>
        <div className={styles.loading}>
          <h2>Loading article...</h2>
        </div>
      </Layout>
    );
  }

   return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>{post.title}</h1>

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className={styles.coverImage}
          />
        )}

        <div className={styles.meta}>
          <span>
            By <strong>{post.author}</strong>
          </span>

          <span>
            {new Date(post.createdAt).toLocaleDateString()}
          </span>

          <span> {post.likes} Likes</span>

          <span> {comments.length} Comments</span>
        </div>

        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>

        <article className={styles.article}>
          {post.content}
        </article>

        <section className={styles.commentsSection}>
          <h2 className={styles.sectionTitle}>
            Comments ({comments.length})
          </h2>

          {comments.length === 0 ? (
            <p className={styles.noComments}>
              No comments yet.
            </p>
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
        </section>

        <section className={styles.commentBox}>
          <h2 className={styles.sectionTitle}>
            Leave a Comment
          </h2>

          <form
            className={styles.commentForm}
            onSubmit={handleCommentSubmit}
          >
            <input
              className={styles.input}
              type="text"
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <textarea
              className={styles.textarea}
              rows="5"
              placeholder="Write your thoughts..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <button
              className={styles.button}
              type="submit"
            >
              Publish Comment
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
}