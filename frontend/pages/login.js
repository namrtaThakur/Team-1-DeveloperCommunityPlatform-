import { useState } from "react";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Login failed."
        );
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem(
        "user",
        JSON.stringify(result.user)
      );

      alert("Login successful!");

      router.push("/");
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
            Welcome Back
          </h1>

          <p className={styles.subtitle}>
            Login to continue to DevConnect.
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
                placeholder="Enter password"
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
                ? "Logging in..."
                : "Login"}
            </button>
          </form>

          <p className={styles.footer}>
            Don't have an account?{" "}
            <span
              className={styles.link}
              onClick={() =>
                router.push("/register")
              }
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}