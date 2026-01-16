"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
    } else {
      setMessage("Login successful");
      localStorage.setItem("token", data.token);
localStorage.setItem("role", data.role);

if (data.role === "ADMIN") {
  window.location.href = "/admin";
} else {
  window.location.href = "/user/dashboard";
}


    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>LOGIN</h1>

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            Email
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            Password
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

/* 🎨 Styles (TypeScript-safe) */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex" as const,
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #eef2f3, #fce4ec)",
  },

  card: {
    width: "420px",
    padding: "40px",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },

  heading: {
    textAlign: "center" as const,
    marginBottom: "30px",
    color: "#1b5e20",
    fontSize: "28px",
    fontWeight: "800",
    letterSpacing: "3px",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
  },

  inputGroup: {
    display: "flex" as const,
    flexDirection: "column" as const,
    marginBottom: "20px",
    color: "#3e2723",
    fontSize: "16px",
    fontWeight: "500",
  },

  input: {
    marginTop: "8px",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #cfd8dc",
    fontSize: "16px",
    background: "#f9fbfd",
    boxShadow: "inset 0 2px 5px rgba(0,0,0,0.12)",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "10px",
    borderRadius: "12px",
    border: "none",
    background: "#1976d2",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer" as const,
  },

  success: {
    marginTop: "18px",
    textAlign: "center" as const,
    color: "green",
    fontWeight: "600",
  },

  error: {
    marginTop: "18px",
    textAlign: "center" as const,
    color: "red",
    fontWeight: "600",
  },
};

