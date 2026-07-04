import Link from "next/link";
import TagBadge from "./TagBadge";

export default function PostCard({
  id,
  title,
  author,
  tags = [],
  likes,
  commentCount,
}) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Link
        href={`/post/${id}`}
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            cursor: "pointer",
          }}
        >
          {title}
        </h2>
      </Link>

      <p style={{ color: "#666" }}>
        <strong>Author:</strong> {author}
      </p>

      <div style={{ margin: "15px 0" }}>
        {tags.map((tag) => (
          <TagBadge
            key={tag}
            tag={tag}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "15px",
          color: "#555",
        }}
      >
        <span> {likes} Likes</span>

        <span> {commentCount} Comments</span>
      </div>

      {/* TODO: Add description/content when backend supports it */}
    </div>
  );
}