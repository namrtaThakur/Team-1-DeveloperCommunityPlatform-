import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import PostCard from "../../components/PostCard";
import styles from "./tag.module.css";

export default function TagPage() {
  const router = useRouter();
  const { tag } = router.query;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    if (!tag) return;

    fetchPosts();
  }, [tag]);

     async function fetchPosts() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/posts?tag=${encodeURIComponent(tag)}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch posts."
        );
      }

      setPosts(result.data?.posts || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

   return (
    <Layout>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            #{tag || ""}
          </h1>

          <p className={styles.subtitle}>
            Explore articles related to{" "}
            <strong>{tag ||""}</strong>.
          </p>
          {!loading && (
          <span className={styles.count}>
            {posts.length} article
            {posts.length !== 1 ? "s" : ""} found
          </span>
          )}
        </section>

        {loading ? (
          <div className={styles.loadingCard}>
            <h2>Loading posts...</h2>
            <p>Please wait.</p>
          </div>
        ) : error ? (
          <div className={styles.errorCard}>
            <h2>Unable to load posts</h2>
            <p>{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className={styles.emptyCard}>
            <h2>No posts found</h2>

            <p>
              No articles have been published for this tag yet.
            </p>
          </div>

        ) : (
          <div className={styles.posts}>
            {posts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                title={post.title}
                author={post.author?.username || "Anonymous"}
                content={post.content}
                tags={post.tags || []}
                likes={post.likes}
                commentCount={
                  post.commentsCount || 0
                }
                coverImage={post.coverImage}
                createdAt={post.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}