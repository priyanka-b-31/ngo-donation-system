🧾 NGO Donation System
📌 Project Overview

Non-Governmental Organizations (NGOs) often run online campaigns where users register to support a cause and may optionally donate.
In many systems, user data is lost when a donation fails or is not completed, and administrators lack proper visibility into registrations and payment statuses.

This project addresses these issues by building a backend-driven NGO Donation System where:

User registration is independent of payment

All donation attempts are tracked and stored

Payment status is handled ethically and transparently

Admins have complete visibility of users and donations

🎯 Objectives

The primary objectives of this project are:

Allow users to register with or without donating

Ensure user data is saved regardless of payment outcome

Track donations with SUCCESS / FAILED / PENDING states

Provide admins with a central dashboard for monitoring

Integrate a sandbox payment gateway (Stripe Test Mode)

🧩 Functional Requirements
🔐 1. Authentication

Common Login & Register page

Role-based access:

USER

ADMIN

Automatic redirection after login based on role

👤 2. User Side Features
User Registration

Users can register without making a donation

Registration data is always stored

Donation Flow

Users can donate any amount

Each donation attempt is recorded

Donation status shown as:

SUCCESS

FAILED

PENDING

User Dashboard

View complete donation history

View real-time donation status

Navigate to:

Donate page

Profile page

Logout

User Profile

View registered name

View email

View role

View registration date

🛠️ 3. Admin Side Features
Admin Dashboard

View total registered users

View total donations

View aggregated donation amounts

User Management

View all registered users

See registration timestamps

Donation Management

View all donation records

Track payment status and timestamps

Clearly differentiate between:

Successful

Failed

Pending payments

💳 Payment Gateway Integration

Integrated Stripe Payment Gateway (Test / Sandbox Mode)

Uses Stripe Payment Intents

No real money involved

Test cards used for demonstration

Payment success is marked only after genuine confirmation

✅ Stripe Test Card Used
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)

📜 Data & Payment Handling Rules

User registration is independent of donation completion

Donation success is recorded only after confirmation

Failed and pending donations are clearly stored

No fake or forced payment success logic is used

🏗️ Tech Stack
Layer	Technology
Frontend	Next.js (App Router)
Backend	Next.js API Routes
Database	MongoDB
Authentication	JWT
Payment Gateway	Stripe (Test Mode)
Language	TypeScript
🗂️ Project Structure
app/
 ├── api/
 │   ├── auth/
 │   ├── donation/
 │   ├── payment/
 │   └── admin/
 ├── donate/
 ├── login/
 ├── register/
 ├── user/
 │   ├── dashboard/
 │   └── profile/
 ├── admin/
 │   ├── users/
 │   └── donations/
lib/
models/

▶️ Running the Project Locally
1️⃣ Install dependencies
npm install

2️⃣ Add environment variables (.env.local)
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_test_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_test_publishable_key

3️⃣ Start development server
npm run dev


Open in browser:

http://localhost:3000