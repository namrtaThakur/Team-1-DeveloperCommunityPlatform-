import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import PostCard from "../../components/PostCard";

export default function TagPage() {
  const router = useRouter();
  const { tag } = router.query;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!tag) return;

    // Replace with backend API when tag filtering is available

    const samplePosts = [
      {
        id: 1,
        title: "React Basics",
        author: "Namrata",
        tags: ["React", "JavaScript"],
        likes: 10,
        commentCount: 4,
      },
      {
        id: 2,
        title: "React Hooks",
        author: "John",
        tags: ["React"],
        likes: 15,
        commentCount: 7,
      },
    ];

    const filteredPosts = samplePosts.filter((post) =>
      post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );

    setPosts(filteredPosts);
  }, [tag]);

  return (
    <Layout>
      <h1>Posts tagged: #{tag}</h1>

      {posts.length === 0 ? (
        <p>No posts found.</p>
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