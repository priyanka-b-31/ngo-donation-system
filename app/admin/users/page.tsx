"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "ADMIN") {
      router.push("/login");
      return;
    }

    fetch("/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setError("Failed to load users"));
  }, [router]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>ADMIN USERS</h2>

        {error && <p style={styles.error}>{error}</p>}

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Registered On</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                }}
              >
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>
                <td style={styles.td}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 🎨 Styles */
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e8f5e9, #e3f2fd)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    background: "#ffffff",
    width: "90%",
    maxWidth: "900px",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1b5e20",
    fontSize: "26px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    backgroundColor: "#1b5e20",
    color: "#ffffff",
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "15px",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    color: "#000000", // ✅ ALL TABLE TEXT BLACK
    fontSize: "15px",
    fontWeight: "500",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
    fontWeight: "600",
  },
};


