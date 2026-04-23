# AarthFlow

**Turn confirmed orders into instant working capital.**
A B2B fintech platform helping Indian SMEs bridge payment term gaps created by large corporate buyers.

> Built by Prince Nayakpara

---

## Prototype

**[View Figma Prototype](https://www.figma.com/proto/fUfE3lQEQJ6YcYi45y34Qi/Untitled?node-id=0-1&t=UK1ZYtUfW9CVYkuU-1)**

---

## Problem Statement

Small suppliers selling to large corporate buyers face one-sided payment terms of 60 to 90 days or longer, while needing to pay their own suppliers within 30 days. This creates working capital gaps that force SMEs to take expensive short-term loans at 18 to 24% interest.

Large buyers refuse to negotiate shorter payment cycles, knowing small suppliers are desperate for orders. No mechanism exists to standardize or enforce fair payment terms, leaving SMEs cash-starved despite having confirmed orders.

---

## Solution

AarthFlow gives SME founders and CFOs a single platform to visualize their payment gaps, assess buyer risk, and access instant financing against confirmed invoices — without waiting 60 to 90 days to get paid.

---

## Core Features

| Feature | Description |
|---|---|
| Payment Gap Visualizer | Gantt-style timeline showing receivables vs obligations side by side |
| Buyer Risk Scoring | Automatic risk assessment based on buyer payment behavior and delay patterns |
| Invoice Financing | Apply for invoice discounting, supply chain finance, or working capital loans instantly |
| Cash Gap Dashboard | Real-time view of working capital health, DSO, and exposure |
| PDF Reports | Downloadable payslip-style reports for each financing transaction |

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |

---

## Project Status

This project is currently in active development. Features and structure are subject to change.

---

## Project Structure

```
aarthflow/
|
├── frontend/                   # React frontend (Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Route pages
│   │   └── utils/              # Helper functions
│   ├── index.html
│   └── vite.config.js
|
├── backend/                    # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── middleware/
|
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### 1. Clone and Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Run the App

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

### 4. Open Your Browser

Navigate to [http://localhost:5173](http://localhost:5173)

---

## Target Users

- SME founders with 1 to 50 employees
- CFOs managing working capital for small manufacturing or services businesses
- Small suppliers selling to large corporate buyers in India

---

## Market Context

- Sector: B2B Financial Services
- Geography: India
- Target segment: SMEs with confirmed orders but cash flow constraints
- Core pain: 60 to 90 day payment cycles vs 30 day payment obligations

---

AarthFlow — Built for the SMEs that keep India running.
