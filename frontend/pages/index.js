import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import styles from "./home.module.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:5000/posts");

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    
    fetchPosts();
  }, []);

    return (
    <Layout>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Welcome to DevConnect
        </h1>

        <p className={styles.subtitle}>
          Discover insightful articles, share your knowledge,
          and connect with developers from around the world.
        </p>
      </section>

      {loading ? (
        <div className={styles.loadingCard}>
          <h2>Loading posts...</h2>
          <p>Please wait while we fetch the latest articles.</p>
        </div>
      ) : posts.length === 0 ? (
        <div className={styles.emptyCard}>
          <h2>No Posts Yet</h2>
          <p>
            Be the first to share something with the community.
          </p>
        </div>
      ) : (
        <section className={styles.posts}>
          {posts.map((post) => (
            <PostCard
              key={post._id || post.id}
              id={post._id || post.id}
              title={post.title}
              author={post.author?.name || post.author}
              content={post.content}
              tags={post.tags}
              likes={post.likes}
              commentCount={
                post.commentsCount ??
                post.commentCount ??
                0
              }
              coverImage={post.coverImage}
              createdAt={post.createdAt}
            />
          ))}
        </section>
      )}
    </Layout>
  );
}