import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
      }}
    >
      <Link
        href="/"
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        <h1 style={{ margin: 0 }}>DevConnect</h1>
      </Link>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          Home
        </Link>

        <Link
          href="/create"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          Create Post
        </Link>
      </div>
    </nav>
  );
}