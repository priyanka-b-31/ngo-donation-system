"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

/* -------------------- MAIN PAGE -------------------- */
export default function DonatePage() {
  return (
    <Elements stripe={stripePromise}>
      <DonateForm />
    </Elements>
  );
}

/* -------------------- FORM -------------------- */
function DonateForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError(false);

    if (!stripe || !elements) {
      setError(true);
      setMessage("Stripe not loaded");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError(true);
      setMessage("Please enter a valid amount");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError(true);
      setMessage("Please login first");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create payment intent
      const res = await fetch("/api/payment/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // 2️⃣ Confirm card payment
      const card = elements.getElement(CardElement);
      if (!card) throw new Error("Card details missing");

      const result = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card,
          },
        }
      );

      if (result.error) {
        throw new Error(result.error.message);
      }

      // 3️⃣ Confirm on backend
      await fetch("/api/payment/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentIntentId: result.paymentIntent?.id,
        }),
      });

      setMessage("🎉 Donation successful!");
      setAmount("");
      card.clear();
    } catch (err: any) {
      setError(true);
      setMessage(err.message || "Donation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>MAKE A DONATION</h2>

        <form onSubmit={handleDonate}>
          <input
            style={styles.input}
            type="number"
            placeholder="Enter amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div style={styles.cardBox}>
            <CardElement />
          </div>

          <button style={styles.button} disabled={loading}>
            {loading ? "Processing..." : "Donate"}
          </button>
        </form>

        {message && (
          <p style={error ? styles.error : styles.success}>{message}</p>
        )}
      </div>
    </div>
  );
}

/* -------------------- STYLES -------------------- */
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "35px",
    width: "380px",
    borderRadius: "14px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "22px",
    fontWeight: "800",
    letterSpacing: "2px",
    color: "#2e7d32",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  cardBox: {
    padding: "14px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  success: {
    marginTop: "15px",
    color: "green",
    textAlign: "center",
    fontWeight: "600",
  },
  error: {
    marginTop: "15px",
    color: "red",
    textAlign: "center",
    fontWeight: "600",
  },
};




