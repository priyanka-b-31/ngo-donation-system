"use client";

export default function DonationCancel() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      color: "red",
      flexDirection: "column"
    }}>
      <h1>❌ Donation Cancelled</h1>
      <p>You can try again anytime.</p>
    </div>
  );
}
