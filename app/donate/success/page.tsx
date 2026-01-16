"use client";

export default function DonationSuccess() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      color: "green",
      flexDirection: "column"
    }}>
      <h1>✅ Donation Successful</h1>
      <p>Thank you for supporting the cause!</p>
    </div>
  );
}
