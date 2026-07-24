import { useState } from "react";
import styles from "./PostForm.module.css";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter both a title and content.");
      return;
    }

    
    // add content and coverImage once backend supports them

    const newPost = {
      title: title.trim(),
      author: "Namrta", // Replace with logged-in user later
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to publish post");
      }

      const data = await response.json();

      console.log("Created Post:", data);

      alert("Post published successfully!");

      // Clear form
      setTitle("");
      setContent("");
      setTags("");
      setCoverImage("");
    } catch (error) {
      console.error(error);

      alert(
        "Could not connect to the backend. Make sure the backend server is running."
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className = {styles.label}>Title</label>
        <br />
        <input
        className={styles.input}
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <br />

      <div className = {styles.formGroup}>
        <label className = {styles.label}>Content</label>
        <br />
        <textarea
        className = {styles.textarea}
          rows="6"
          placeholder="Write your article..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <br />

      <div className = {styles.formGroup}>
        <label className = {styles.label}>Tags</label>
        <br />
        <input
        className ={styles.input}
          type="text"
          placeholder="React, JavaScript"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <br />

      <div className = {styles.formGroup}>
        <label className = {styles.label}>Cover Image URL</label>
        <br />
        <input
        className = {styles.input}
          type="text"
          placeholder="https://example.com/image.jpg"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />
      </div>

      <br />

      <button className={styles.button} type="submit">
        Publish Post
      </button>
    </form>
  );
}