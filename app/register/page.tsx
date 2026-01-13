"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function handleRegister() {
    setMessage("");

    if (!name || !email || !password) {
      setError(true);
      setMessage("Please fill all the details");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(true);
      setMessage(data.message || "Registration failed");
    } else {
      setError(false);
      setMessage(data.message);
      setName("");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>USER REGISTRATION</h2>

        <div style={styles.inputGroup}>
          <label>Name</label>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Email</label>
          <input
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button style={styles.button} onClick={handleRegister}>
          Register
        </button>

        {message && (
          <p style={error ? styles.errorMsg : styles.successMsg}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

/* 🎨 Styles */
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2f7, #fce4ec)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  card: {
    background: "#ffffff",
    padding: "40px",
    width: "420px", // ⬅️ bigger box
    borderRadius: "14px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
  },

  heading: {
  textAlign: "center",
  marginBottom: "30px",
  color: "#4e342e", // dark brown
  fontSize: "26px", // increased
  fontWeight: "800",
  letterSpacing: "2.5px",
  fontFamily: "'Poppins', 'Segoe UI', sans-serif",
},


  inputGroup: {
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
  color: "#3e2723", // darker brown
  fontSize: "16px", // increased label size
  fontWeight: "500",
},


  input: {
  padding: "14px",           // bigger height
  marginTop: "8px",
  borderRadius: "10px",
  border: "1px solid #cfd8dc",
  fontSize: "16px",          // bigger text inside
  background: "#f9fbfd",
  boxShadow: "inset 0 2px 5px rgba(0,0,0,0.12)",
},


  button: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  successMsg: {
    marginTop: "18px",
    color: "#2e7d32",
    textAlign: "center",
    fontWeight: "600",
  },

  errorMsg: {
    marginTop: "18px",
    color: "#c62828",
    textAlign: "center",
    fontWeight: "600",
  },
};
