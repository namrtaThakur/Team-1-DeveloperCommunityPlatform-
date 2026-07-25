import Layout from "../components/Layout";
import PostForm from "../components/PostForm";
import styles from ".create.module.css";

export default function Create() {
  return (
    <Layout>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Create a New Post
          </h1>

          <p className={styles.subtitle}>
            Share your ideas, tutorials, projects, and experiences with the
            developer community. Your knowledge could help thousands of fellow
            developers learn something new.
          </p>
        </section>

        <div className={styles.formContainer}>
          <PostForm />
        </div>
      </div>
    </Layout>
  );
}