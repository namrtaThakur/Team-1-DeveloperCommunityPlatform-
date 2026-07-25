import Link from "next/link";
import styles from "./TagBadge.module.css"

export default function TagBadge({ tag }) {
  return (
    <Link
      href={`/tag/${tag.toLowerCase()}`}
      className = {styles.link}
    >
      <span className = {styles.badge}>
        #{tag}
      </span>
    </Link>
  );
}