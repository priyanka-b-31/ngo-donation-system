"use client";

import { useState } from "react";

export default function DonatePage() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function handleDonate() {
    setMessage("");

    if (!amount || Number(amount) <= 0) {
      setError(true);
      setMessage("Please enter a valid donation amount");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError(true);
      setMessage("Please login first");
      return;
    }

    try {
      // 1️⃣ Create donation (PENDING)
      const createRes = await fetch("/api/donation/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const createData = await createRes.json();
      if (!createRes.ok) throw new Error(createData.message);

      // 2️⃣ Create Stripe payment intent
      const intentRes = await fetch("/api/donation/stripe-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ donationId: createData.donationId }),
      });

      const intentData = await intentRes.json();
      if (!intentRes.ok) throw new Error(intentData.message);

      // 3️⃣ Verify payment (simulate)
      const verifyRes = await fetch("/api/donation/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          donationId: createData.donationId,
          paymentIntentId: intentData.paymentIntentId,
        }),
      });

      const verifyData = await verifyRes.json();

      setError(false);
      setMessage(
        `Donation processed. Final status: ${verifyData.status}`
      );
      setAmount("");
    } catch (err: any) {
      setError(true);
      setMessage(err.message || "Donation failed");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Make a Donation</h2>

        <div style={styles.inputGroup}>
          <label>Donation Amount</label>
          <input
            style={styles.input}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <button style={styles.button} onClick={handleDonate}>
          Donate
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
    background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: "30px",
    width: "350px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
    color: "#555",
  },
  input: {
    padding: "10px",
    marginTop: "5px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  successMsg: {
    marginTop: "15px",
    color: "green",
    textAlign: "center",
  },
  errorMsg: {
    marginTop: "15px",
    color: "red",
    textAlign: "center",
  },
};
