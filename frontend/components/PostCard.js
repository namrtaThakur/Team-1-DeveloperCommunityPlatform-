import Link from "next/link";
import TagBadge from "./TagBadge";
import styles from "./PostCard.module.css";

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
    content && content.length > 140
      ? content.substring(0, 140) + "..."
      : content;
  return (

    <article className={styles.card}>

      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className={styles.coverImage}
        />
      )}
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
          <span>
            By <strong>{author || "Anonymous"}</strong>
          </span>

          {createdAt && (
            <span>
              • {new Date(createdAt).toLocaleDateString()}
            </span>
          )}
        </div>

      
      {preview &&(<p className = {styles.author}>
        <strong>Author:</strong> {author}
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
        <span> {likes} Likes</span>

        <span> {commentCount} Comments</span>
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