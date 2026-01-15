"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Summary = {
  totalUsers: number;
  totalDonations: number;
  totalAmount: number;
};

export default function AdminPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "ADMIN") {
      router.push("/login");
      return;
    }

    fetch("/api/admin/summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setSummary(data))
      .catch(() => {
        setError("Failed to load admin data");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/login");
      });
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* 🔴 LOGOUT BUTTON */}
        <div style={styles.navbar}>
  <div>
    <button style={styles.navBtn} onClick={() => router.push("/admin")}>
      Dashboard
    </button>
  
  </div>

  <button style={styles.logoutBtn} onClick={handleLogout}>
    Logout
  </button>
</div>

<h1 style={styles.heading}>ADMIN DASHBOARD</h1>


        {error && <p style={styles.errorMsg}>{error}</p>}

        {!summary ? (
          <p style={styles.loading}>Loading...</p>
        ) : (
          <>
            <div style={styles.statBox}>
              <p style={styles.statLabel}>TOTAL USERS</p>
              <p style={styles.statValue}>{summary.totalUsers}</p>
            </div>

            <div style={styles.statBox}>
              <p style={styles.statLabel}>SUCCESSFUL DONATIONS</p>
              <p style={styles.statValue}>{summary.totalDonations}</p>
            </div>

            <div style={styles.statBox}>
              <p style={styles.statLabel}>TOTAL DONATION AMOUNT</p>
              <p style={styles.statValue}>₹ {summary.totalAmount}</p>
            </div>
            <div style={{ 
  marginTop: "25px", 
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  gap: "20px"
}}>
  <a href="/admin/users" style={styles.link}>
    View Users
  </a>
  <a href="/admin/donations" style={styles.link}>
    View Donations
  </a>
</div>

          </>
        )}
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
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
  },

  card: {
    background: "#ffffff",
    padding: "45px",
    width: "520px",
    borderRadius: "18px",
    boxShadow: "0 25px 55px rgba(0,0,0,0.18)",
    position: "relative",
  },

  logoutBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "8px 14px",
    background: "#c62828",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },

  heading: {
    textAlign: "center",
    marginBottom: "35px",
    color: "#0d47a1",
    fontSize: "30px",
    fontWeight: "900",
    letterSpacing: "3px",
  },

  statBox: {
    background: "#e0e7ef",
    padding: "24px",
    borderRadius: "14px",
    marginBottom: "18px",
    textAlign: "center",
    boxShadow: "inset 0 3px 8px rgba(0,0,0,0.12)",
  },

  statLabel: {
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "1.5px",
    color: "#37474f",
    marginBottom: "6px",
  },

  statValue: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#263238",
  },

  loading: {
    textAlign: "center",
    fontSize: "16px",
    color: "#555",
  },

  errorMsg: {
    color: "#c62828",
    textAlign: "center",
    marginBottom: "15px",
    fontWeight: "600",
  },
  navbar: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
},

navBtn: {
  marginRight: "10px",
  padding: "8px 14px",
  borderRadius: "8px",
  border: "none",
  background: "#e3f2fd",
  color: "#0d47a1",
  fontWeight: "600",
  cursor: "pointer",
},

link: {
  color: "#1b5e20",
  fontWeight: "600",
  textDecoration: "none",
  fontSize: "16px",
  padding: "8px 14px",
  borderRadius: "8px",
  background: "#e8f5e9",
},


};


