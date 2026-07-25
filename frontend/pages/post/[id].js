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
   const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  const [error, setError] = useState("");

  const [commentText, setCommentText] = useState("");


  useEffect(() => {
    if (!id) return;

    fetchPost();
    fetchComments();
  }, [id]);
    
  async function fetchPost() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `http://localhost:5000/posts/${id}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch post.");
      }

      setPost(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchComments() {
    try {
      const response = await fetch(
        `http://localhost:5000/posts/${id}/comments`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch comments."
        );
      }

        setComments(result.data);
      }
     catch (err) {
      console.error(err);
    }
  }

 

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      alert("Please enter a commemt");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        return;
      }

     try {
      setCommentLoading(true);

      

      

      const response = await fetch(
        `http://localhost:5000/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: commentText,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to post comment.");
      }

      setCommentText("");

     await fetchComments();
     await fetchPost();
    } catch (err) {
      alert(err.message);
    } finally {
      setCommentLoading(false);
    }
  };
     if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>
          <h2>Loading article...</h2>
        </div>
      </Layout>
    );
  }

   

  if (error) {
    return (
      <Layout>
        <div className={styles.errorCard}>
          <h2>Unable to load post</h2>
          <p>{error}</p>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return null;
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
            By {"" }
            <strong>
              {post.author?.username || "Anonymous"}</strong>
          </span>

          <span>
            {new Date(post.createdAt).toLocaleDateString()}
          </span>

           <span>
            ❤️ {post.likes?.length || 0} Likes
          </span>

          <span>
            💬 {post.commentsCount || 0} Comments
          </span>

        </div>

        <div className={styles.tags}>
          {post.tags?.map((tag) => (
            <TagBadge 
            key={tag} 
            tag={tag} />
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
                username={comment.author?.username ||"Anonymous"}
                text={comment.content}
                createdAt={new Date(comment.createdAt).toLocaleString()}
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
           

            <textarea
              className={styles.textarea}
              rows="5"
              placeholder="Write your thoughts..."
              value={commentText}
              disabled={commentLoading}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <button
             type = "submit"
              className={styles.button}
              disabled={commentLoading}
            >
              {commentLoading
                ? "Posting..."
                : "Publish Comment"}
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
}