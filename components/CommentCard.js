export default function CommentCard({
  username,
  text,
  createdAt,
}) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <h4
        style={{
          margin: "0 0 10px 0",
          color: "#333",
        }}
      >
        {username || "Anonymous"}
      </h4>

      <p
        style={{
          margin: "0 0 12px 0",
          lineHeight: "1.6",
          color: "#444",
        }}
      >
        {text}
      </p>

      <small
        style={{
          color: "#777",
        }}
      >
        {createdAt || "Just now"}
      </small>
    </div>
  );
}