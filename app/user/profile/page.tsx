"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "USER") {
      router.push("/login");
      return;
    }

    fetch("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setUser);
  }, [router]);

  if (!user) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading...</p>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>MY PROFILE</h2>

        <div style={styles.row}>
          <span style={styles.label}>Name</span>
          <span style={styles.value}>{user.name}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Email</span>
          <span style={styles.value}>{user.email}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Role</span>
          <span style={styles.value}>{user.role}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Registered On</span>
          <span style={styles.value}>
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div style={styles.actions}>
          <button
            style={styles.dashboardBtn}
            onClick={() => router.push("/user/dashboard")}
          >
            Back to Dashboard
          </button>

          <button
            style={styles.logoutBtn}
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "#ffffff",
    width: "420px",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#4e342e", // dark brown
    fontSize: "26px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
    fontSize: "16px",
  },

  label: {
    fontWeight: "600",
    color: "#555",
  },

  value: {
    fontWeight: "600",
    color: "#000",
  },

  actions: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
  },

  dashboardBtn: {
    flex: 1,
    padding: "12px",
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },

  logoutBtn: {
    flex: 1,
    padding: "12px",
    background: "#c62828",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
