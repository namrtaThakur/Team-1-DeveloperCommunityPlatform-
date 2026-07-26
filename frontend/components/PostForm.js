import { useState } from "react";
import styles from "./Postform.module.css";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState("published");

  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

     if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!content.trim()) {
      alert("Please enter some content.");
      return;
    }

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    if (tagsArray.length === 0) {
      alert("Please enter at least one tag.");
      return;
    }

      const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    const newPost = {
      title: title.trim(),
      content: content.trim(), 
      tags: tagsArray,
        status,
        coverImage: coverImage.trim(),
    };

    try {

      setIsSubmitting(true);
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors?.join("\n") ||
            data.message ||
            "Failed to publish post.");
      }

      console.log("Created Post:", data);

      alert("Post published successfully!");

      
      setTitle("");
      setContent("");
      setTags("");
      setCoverImage("");
      setStatus("published");
    } catch (error) {
      console.error(error);

      alert(
        error.message
      );
    }
    finally{
      setIsSubmitting(false);
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
          rows="8"
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
         <small className={styles.helperText}>
          Separate multiple tags using commas.
        </small>
      </div>

      <br />

      <div className = {styles.formGroup}>
        <label className = {styles.label}>Status</label>
        <br />

        <select
          className={styles.input}
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="published">
            Published
          </option>

          <option value="draft">
            Draft
          </option>
        </select>
      </div>

      <br />

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Cover Image URL
        </label>

        <br />

        <input
        className = {styles.input}
          type="text"
          placeholder="https://example.com/image.jpg"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />

        <small className={styles.helperText}>
          Optional. This will be used once image support is available.
        </small>
      </div>

      <br />

      <button className={styles.button}
       type="submit"
       disabled={isSubmitting}
       >
        {isSubmitting ? "Publishing..." : "Publish Posts"}
      </button>
    </form>
  );
}