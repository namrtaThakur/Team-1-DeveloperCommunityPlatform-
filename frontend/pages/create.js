import Layout from "../components/Layout";
import PostForm from "../components/PostForm";

export default function Create() {
  return (
    <Layout>
      <div
        style={{
          padding: "20px",
        }}
      >
        <h1>Create New Post</h1>

        <p>
          Share your knowledge with the developer community.
        </p>

        <PostForm />

        {/* Redirect user after successful post creation */}
      </div>
    </Layout>
  );
}