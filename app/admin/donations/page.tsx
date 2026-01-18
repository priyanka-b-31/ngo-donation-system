"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Donation = {
  _id: string;
  userEmail: string;
  amount: number;
  status: "SUCCESS" | "FAILED" | "PENDING" | string;
  createdAt: string;
};

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "ADMIN") {
      router.push("/login");
      return;
    }

    fetch("/api/admin/donations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDonations(data.donations || data))
      .catch(() => setError("Failed to load donations"));
  }, [router]);

  /* ✅ OPTION A: HIDE FAILED DONATIONS (UI ONLY) */
  const visibleDonations = donations.filter(
    (d) => d.status?.toUpperCase().trim() !== "FAILED"
  );

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>DONATION HISTORY</h2>

        {error && <p style={styles.error}>{error}</p>}

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>User Email</th>
              <th style={styles.th}>Amount (₹)</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>

          <tbody>
            {visibleDonations.map((d, index) => (
              <tr
                key={d._id}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                }}
              >
                <td style={styles.td}>{d.userEmail}</td>
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

        {visibleDonations.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No successful or pending donations to display
          </p>
        )}
      </div>
    </div>
  );
}

/* 🔹 STATUS COLOR HELPER */
function statusStyle(status: string) {
  const normalized = status?.toUpperCase().trim();

  if (normalized === "SUCCESS")
    return { color: "green", fontWeight: "700" };

  if (normalized === "PENDING")
    return { color: "orange", fontWeight: "700" };

  return {};
}

/* 🎨 STYLES */
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e3f2fd, #e8f5e9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    background: "#ffffff",
    width: "95%",
    maxWidth: "1000px",
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
    background: "#1b5e20",
    color: "#ffffff",
    padding: "12px",
    textAlign: "left",
    fontSize: "15px",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    color: "#000000",
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


