import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import PostCard from "../../components/PostCard";
import styles from "./tag.module.css";

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
        author: "Namrta",
         content:
          "Learn the fundamentals of React including components and JSX.",
        tags: ["React", "JavaScript"],
        likes: 10,
        commentCount: 4,
         coverImage:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",

      },
      {
        id: 2,
        title: "React Hooks",
        author: "John",
        content:
          "Understand useState and useEffect with practical examples.",

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
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            #{tag}
          </h1>

          <p className={styles.subtitle}>
            Explore articles related to{" "}
            <strong>{tag}</strong>.
          </p>

          <span className={styles.count}>
            {posts.length} article
            {posts.length !== 1 ? "s" : ""} found
          </span>
        </section>

        {posts.length === 0 ? (
          <div className={styles.emptyCard}>
            <h2>No posts found</h2>

            <p>
              No articles have been published for this tag
              yet.
            </p>
          </div>
        ) : (
          <div className={styles.posts}>
            {posts.map((post) => (
              <PostCard
                key={post._id || post.id}
                id={post._id || post.id}
                title={post.title}
                author={post.author}
                content={post.content}
                tags={post.tags}
                likes={post.likes}
                commentCount={
                  post.commentsCount ??
                  post.commentCount ??
                  0
                }
                coverImage={post.coverImage}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}