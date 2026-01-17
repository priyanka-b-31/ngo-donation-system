# NGO Donation System

A backend-driven web application for NGOs that allows users to register independently of donations and enables administrators to monitor registrations and donation activities with full transparency.

This project ensures ethical payment handling, accurate donation tracking, and clear separation between user registration and donation flow.

---

## 1. Introduction

Non-Governmental Organizations (NGOs) often run online campaigns where users register to support a cause and may optionally donate.  
In many systems, user data is lost if a donation is not completed, and administrators lack clear visibility into registrations and payments.

This project solves that problem by separating **user registration** from **donation flow**, ensuring that:

- User data is always stored
- Donation attempts are tracked regardless of payment outcome
- Administrators have complete visibility into users and donations

---

## 2. Objective

The objective of this project is to design and develop a secure system where:

- Users can register and optionally donate
- User data is saved regardless of payment success or failure
- Administrators can accurately monitor registrations and donations
- Payments are handled ethically using a sandbox payment gateway

---

## 3. Key Features

- Role-based authentication (User / Admin)
- Independent user registration
- Donation tracking with SUCCESS / FAILED / PENDING states
- Admin dashboard for monitoring users and donations
- Stripe sandbox payment gateway integration

---

## 4. Functional Requirements

### 4.1 Authentication
- Common Login & Register page for users and admins
- Role-based access control
- Automatic redirection after login based on role

---

### 4.2 User Side Requirements

#### a) User Registration
- Users can register without making a donation
- Registration data is stored permanently

#### b) Donation Flow
- Users can donate any amount
- Each donation attempt is recorded
- Donation status is displayed as:
  - SUCCESS
  - FAILED
  - PENDING

#### c) User Dashboard
- View complete donation history
- View real-time donation status
- Navigate to:
  - Donate page
  - Profile page
  - Logout

#### d) User Profile
- View personal details:
  - Name
  - Email
  - Role
  - Registration date

---

### 4.3 Admin Side Requirements

#### a) Admin Dashboard
- View total registered users
- View total donations
- View total donation amount

#### b) Registration Management
- View all registered users
- Monitor user details and registration dates

#### c) Donation Management
- View all donation records
- Track payment status and timestamps
- View aggregated donation amounts

---

## 5. Data and Payment Handling Rules

- Registration data is stored independently of donation completion
- Donation success is marked only after genuine payment confirmation
- Failed and pending payments are clearly recorded
- No fake or forced payment success logic is used

---

## 6. Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Stripe (Test / Sandbox Mode)

---

## 7. Payment Gateway Integration

- Stripe is integrated in **test mode**
- No real money or live API keys are used
- Test card details are used for demonstration
- Payment statuses are updated based on Stripe response

---

## 8. Stripe Test Card Details (used in demo)

- This project uses Stripe in Test/Sandbox mode.
- Use the following test card details to simulate a successful payment:
- Card Number: 4242 4242 4242 4242
- Expiry Date: Any future date (e.g. 12/34)
- CVC: Any 3 digits (e.g. 123)

---

## 9. Application Routes

### User Routes
-Register: /register
-Login: /login
-Dashboard: /user/dashboard
-Donate: /donate
-Profile: /user/profile

🛠 Admin Routes

## 9. How to Run the Project Locally

### 1. Clone the repository
### 2. Install Dependencies
### 3. Configure Environment Variables
-Create a file named .env.local in the project root and add
MONGODB_URI=mongodb+srv://dbuser:yV3DaFKL0YmKm5D2@dashboard-cluster.nzz9nmw.mongodb.net/ngoDB?appName=dashboard-cluster
-Only Stripe Test keys are used.
-No real money or live payment credentials are required.
### 4. Start the Development Server - npm run dev
### 5. Now, to open the application, open the browser and visit: http://localhost:3000


