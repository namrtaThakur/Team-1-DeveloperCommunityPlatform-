import Link from "next/link";
import TagBadge from "./TagBadge";
import styles from "./Postcard.module.css";

export default function PostCard({
  id,
  title,
  author,
  content,
  tags = [],
  likes,
  commentCount,
  coverImage,
  createdAt,
}) {
  const likesCount = Array.isArray(likes) ? likes.length : likes || 0;

  const preview =
    content && content.length > 180
      ? content.substring(0, 180) + "..."
      : content;

      const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (

    <article className={styles.card}>

        <img
          src={coverImage ||  "https://placehold.co/1200x500/e5e7eb/6b7280?text=DevConnect" }
          alt={title}
          className={styles.coverImage}
        />
      
    <div className={styles.content} >
      <Link
        href={`/post/${id}`}
        className = {styles.titleLink}
      >
        <h2 className = {styles.title}>
          {title}
        </h2>
      </Link>
       <div className={styles.meta}>
           <span>👤 {author || "Anonymous"}</span>

          {formattedDate && (
            <span>🕒 {formattedDate}</span>
          )}
        </div>

      
      {preview &&(<p className = {styles.preview}>
        {preview}

      </p>
      )}

      <div className = {styles.tags}>
        {tags.map((tag) => (
          <TagBadge
            key={tag}
            tag={tag}
          />
        ))}
      </div>

      <div className = {styles.footer}>

        <div className = {styles.stats}>
        <span> {likes} ❤️Likes</span>

        <span> {commentCount}💬 Comments</span>
      </div>
       <Link
            href={`/post/${id}`}
            className={styles.readMore}
          >
            Read More →
          </Link>

      
    </div>
    </div>
    </article>
  );
}