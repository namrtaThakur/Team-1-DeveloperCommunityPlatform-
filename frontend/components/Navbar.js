import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
   
      <Link
       href="/"
       className={styles.logoLink}
  >
        <h1 className={ styles.log}>DevConnect</h1>
      </Link>

      <div className={styles.navLinks}>
        <Link
       href="/"
       className={styles.link}
  >
          Home
        </Link>

        <Link
        href="/create"
       className={styles.link}
  >
          Create Post
        </Link>
      </div>
    </nav>
  );
}