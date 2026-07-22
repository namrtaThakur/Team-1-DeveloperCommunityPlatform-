import Link from "next/link";
import TagBadge from "./TagBadge";
import styles from "./PostCard.module.css";

export default function PostCard({
  id,
  title,
  author,
  tags = [],
  likes,
  commentCount,
}) {
  return (
    <div className={styles.card} >
      <Link
        href={`/post/${id}`}
        className = {styles.titleLink}
      >
        <h2 className = {styles.title}>
          {title}
        </h2>
      </Link>

      <p className = {styles.author}>
        <strong>Author:</strong> {author}
      </p>

      <div className = {styles.tags}>
        {tags.map((tag) => (
          <TagBadge
            key={tag}
            tag={tag}
          />
        ))}
      </div>

      <div className = {styles.footer}>
        <span> {likes} Likes</span>

        <span> {commentCount} Comments</span>
      </div>

      {/* TODO: Add description/content when backend supports it */}
    </div>
  );
}