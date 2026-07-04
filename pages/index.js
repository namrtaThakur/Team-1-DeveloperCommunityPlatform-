import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";

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

    // Replace localhost URL with deployed backend URL in future
    fetchPosts();
  }, []);

  return (
    <Layout>
      <h1>Developer Community</h1>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            author={post.author}
            tags={post.tags}
            likes={post.likes}
            commentCount={post.commentCount}
          />
        ))
      )}
    </Layout>
  );
}