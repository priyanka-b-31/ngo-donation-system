"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const [donations, setDonations] = useState<any[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "USER") {
      router.push("/login");
      return;
    }

    fetch("/api/user/donations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .catch(() => setError("Failed to load donations"));
  }, [router]);

  function handleLogout() {
    localStorage.clear();
    router.push("/login");
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* 🔹 TOP BAR */}
        <div style={styles.topBar}>
          <h2 style={styles.heading}>USER DASHBOARD</h2>

          <div style={styles.navButtons}>
            <button
              style={styles.donateBtn}
              onClick={() => router.push("/donate")}
            >
              Donate Now
            </button>

            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {/* 🔹 DONATION TABLE */}
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => (
              <tr key={d._id}>
                <td style={styles.td}>₹ {d.amount}</td>
                <td style={{ ...styles.td, ...statusStyle(d.status) }}>
                  {d.status}
                </td>
                <td style={styles.td}>
                  {new Date(d.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {donations.length === 0 && (
          <p style={styles.noData}>No donations yet</p>
        )}
      </div>
    </div>
  );
}

/* 🔹 STATUS COLOR */
const statusStyle = (status: string) => ({
  fontWeight: "700",
  color:
    status === "SUCCESS"
      ? "green"
      : status === "FAILED"
      ? "red"
      : "orange",
});

/* 🎨 STYLES */
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e3f2fd, #f1f8e9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    width: "90%",
    maxWidth: "900px",
    padding: "45px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  heading: {
    color: "#4e342e", // ✅ DARK BROWN
    fontSize: "30px",
    fontWeight: "900",
    letterSpacing: "2px",
  },
  navButtons: {
    display: "flex",
    gap: "14px",
  },
  donateBtn: {
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
  },
  logoutBtn: {
    background: "#c62828",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  thRow: {
    background: "#1b5e20",
    color: "#ffffff",
    fontSize: "17px",
  },
  td: {
    padding: "14px",
    borderBottom: "1px solid #ddd",
    color: "#000000",
    fontSize: "16px",
    fontWeight: "500",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "16px",
  },
  noData: {
    textAlign: "center",
    marginTop: "18px",
    fontWeight: "500",
    fontSize: "16px",
    color: "#000",
  },
};



