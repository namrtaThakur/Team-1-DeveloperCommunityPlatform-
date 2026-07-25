
import styles from "./CommentCard.module.css";

export default function CommentCard({
  username,
  text,
  createdAt,
}) {
 return (
    <div className={styles.commentCard}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {(username || "A")[0].toUpperCase()}
        </div>

        <div>
          <h4 className={styles.username}>
            {username || "Anonymous"}
          </h4>

          <small className={styles.time}>
            {createdAt || "Just now"}
          </small>
        </div>
      </div>

      <p className={styles.comment}>
        {text}
      </p>
    </div>
  );
}