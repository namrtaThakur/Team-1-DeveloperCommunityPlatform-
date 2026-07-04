import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Navbar />

      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "30px 20px",
        }}
      >
        {children}
      </main>
    </div>
  );
}