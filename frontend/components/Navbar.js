import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logoLink}>
        <h1 className={styles.logo}>DevConnect</h1>
      </Link>

      <div className={styles.navLinks}>
        <Link href="/" className={styles.link}>
          Home
        </Link>

        <Link href="/create" className={styles.link}>
          Create Post
        </Link>

        <Link href="/login" className={styles.link}>
          Login
        </Link>

        <Link href="/register" className={styles.link}>
          Register
        </Link>
      </div>
    </nav>
  );
}