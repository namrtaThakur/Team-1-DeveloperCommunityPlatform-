import { useState } from "react";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import styles from "./register.module.css";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Registration failed."
        );
      }

      alert("Registration successful!");

      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            Create Account
          </h1>

          <p className={styles.subtitle}>
            Join DevConnect and start sharing your knowledge.
          </p>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Username
              </label>

              <input
                className={styles.input}
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Email
              </label>

              <input
                className={styles.input}
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Password
              </label>

              <input
                className={styles.input}
                type="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            <button
              className={styles.button}
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Register"}
            </button>
          </form>

          <p className={styles.footer}>
            Already have an account?{" "}
            <span
              className={styles.link}
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}