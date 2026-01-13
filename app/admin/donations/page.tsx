"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Donation = {
  _id: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  createdAt: string;
  userEmail: string;
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
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setDonations(data.donations))
      .catch(() => {
        setError("Failed to load donations");
        router.push("/login");
      });
  }, [router]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>DONATION HISTORY</h1>

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
            {donations.map((d) => (
              <tr key={d._id}>
                <td style={styles.td}>{d.userEmail}</td>
                <td style={styles.td}>{d.amount}</td>
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
      </div>
    </div>
  );
}

/* 🎨 Helpers */
function statusStyle(status: string) {
  if (status === "SUCCESS") return { color: "green", fontWeight: "700" };
  if (status === "FAILED") return { color: "red", fontWeight: "700" };
  return { color: "orange", fontWeight: "700" };
}

/* 🎨 Styles */
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f1f8e9, #e3f2fd)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
  },

  card: {
    background: "#ffffff",
    padding: "40px",
    width: "900px",
    borderRadius: "18px",
    boxShadow: "0 25px 55px rgba(0,0,0,0.18)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1b5e20",
    fontSize: "28px",
    fontWeight: "900",
    letterSpacing: "3px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "#1b5e20",
    color: "#fff",
    padding: "12px",
    textAlign: "left",
    fontSize: "14px",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    fontSize: "14px",
    color: "#263238",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "15px",
  },
};
