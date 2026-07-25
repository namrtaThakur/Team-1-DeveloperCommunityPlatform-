import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    router.push("/");
  };

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

        {!user ? (
          <>
            <Link href="/login" className={styles.link}>
              Login
            </Link>

            <Link href="/register" className={styles.registerButton}>
              Register
            </Link>
          </>
        ) : (
          <>
            <span className={styles.username}>
              Hello, {user.username}
            </span>

            <button
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}