import Link from "next/link";

export default function TagBadge({ tag }) {
  return (
    <Link
      href={`/tag/${tag.toLowerCase()}`}
      style={{
        textDecoration: "none",
      }}
    >
      <span
        style={{
          display: "inline-block",
          backgroundColor: "#e5e7eb",
          color: "#374151",
          padding: "6px 12px",
          borderRadius: "20px",
          marginRight: "8px",
          marginBottom: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        #{tag}
      </span>
    </Link>
  );
}