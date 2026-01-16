"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError(false);

    if (!email || !password) {
      setError(true);
      setMessage("Please fill all fields");
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(true);
      setMessage(data.message || "Login failed");
    } else {
      setMessage("Login successful");
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/user";
      }
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>LOGIN</h1>

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Password</label>
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

        {message && (
          <p style={error ? styles.errorMsg : styles.successMsg}>
            {message}
          </p>
        )}

        {/* 🔹 Register Redirect Box */}
        <div style={styles.registerBox}>
          <span style={styles.registerText}>Not registered yet?</span>
          <button
            type="button"
            style={styles.registerBtn}
            onClick={() => (window.location.href = "/register")}
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🎨 Styles */
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #eef2f3, #fce4ec)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  card: {
    width: "420px",
    padding: "40px",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1b5e20", // dark green
    fontSize: "28px",
    fontWeight: "800",
    letterSpacing: "3px",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
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
    cursor: "pointer",
  },

  successMsg: {
    marginTop: "18px",
    textAlign: "center",
    color: "#2e7d32",
    fontWeight: "600",
  },

  errorMsg: {
    marginTop: "18px",
    textAlign: "center",
    color: "#c62828",
    fontWeight: "600",
  },

  /* 🔽 Register box */
  registerBox: {
    marginTop: "25px",
    padding: "14px",
    background: "#f5f5f5",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "inset 0 0 0 1px #ddd",
  },

  registerText: {
    marginRight: "6px",
    fontSize: "15px",
    color: "#333",
    fontWeight: "500",
  },

  registerBtn: {
    background: "none",
    border: "none",
    color: "#1e88e5",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    textDecoration: "underline",
  },
};


