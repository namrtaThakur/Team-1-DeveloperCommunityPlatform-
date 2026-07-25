import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import styles from "./home.module.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    fetchPosts(currentPage);
  }, [currentPage]);

    async function fetchPosts(page = 1) {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
           `http://localhost:5000/posts?page=${page}&limit=10`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch posts");
        }

      setPosts(result.data.posts);
      setCurrentPage(result.data.currentPage);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


       

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

      ) : error ? (
        <div className={styles.errorCard}>
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
        
      ): posts.length === 0 ? (
        <div className={styles.emptyCard}>
          <h2>No Posts Yet</h2>
          <p>
            Be the first to share something with the community.
          </p>
        </div>
      ) : (
        <>
        <section className={styles.posts}>
          {posts.map((post) => (
            <PostCard
              key={post._id }
              id={post._id }
              title={post.title}
              author={post.author?.username || "Unknown"}
              content={post.content}
              tags={post.tags || []}
              likes={post.likes?.length || 0}
              commentCount={post.commentsCount || 0}
              coverImage={post.coverImage}
              createdAt={post.createdAt}
            />
          ))}

        </section>
         <div className={styles.pagination}>
            <button
              className={styles.pageButton}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ← Previous
            </button>

            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>

            <button
              className={styles.pageButton}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next →
            </button>
          </div>
        </>
        

      )}
    </Layout>
  );
}