# Ocean View Resort - Imperial Estate Management

A premium, luxury-vintage themed resort management system designed for the southern coast's most distinguished sanctuaries. This application features a cinematic guest experience and a high-fidelity administrative hierarchy.

## 🏛️ Theme: Luxury Vintage (Archival Heritage)
The entire application adheres to the **"Luxury Vintage"** design system:
- **Palette**: Imperial Brown (`#2C1D1A`), Heritage Gold (`#C5A059`), Bone White (`#FAF9F6`).
- **Aesthetics**: Glassmorphism, archival ledger designs, cinematic transitions, and high-fidelity serif typography.

---

## 🚀 Getting Started

### Prerequisites
- **Java**: 17 or higher
- **Node.js**: 18.x or higher
- **MongoDB**: Local instance running on port `27017`
- **Maven**: (Wrapped with `mvnw`)

---

### 📥 1. Repository Setup
```bash
git clone <repository-url>
cd Ocean_view_resort
```

### ⚙️ 2. Backend Configuration (Spring Boot)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Verify `src/main/resources/application.properties` settings:
   - MongoDB URI: `mongodb://localhost:27017/bishari_ocean_view_resort`
   - Server Port: `8080`
   - Mail Settings: Configured for **Mailtrap** (Sandbox testing).

3. Run the backend:
   ```bash
   ./mvnw spring-boot:run
   ```

### 🎨 3. Frontend Configuration (Vite + React)
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the portal at: `http://localhost:5173`

---

## 🛠️ Key Features

### Guest Portal
- **Cinematic Hero**: 3-slide immersive panorama with dynamic zoom effects.
- **Imperial Registry**: Seamless room reservation system.
- **Archival Statements**: Downloadable/Printable A4 invoices with the "Archival Ledger" design.
- **Royal Concierge**: Automated inquiry system with themed email notifications.

### Administrative Suite
- **Imperial Overview**: Real-time analytics and reservation metrics.
- **Registry Management**: Approve, reject, or rescind imperial decrees (reservations).
- **Electronic Missive Dispatch**: Send themed "Imperial Statements" directly to guest emails.
- **Staff Registry**: Role-based access control for estate managers and housekeeping.

---

## ✉️ Email Integration
The system uses **Mailtrap** for safe email testing.
- **Password Recovery**: "Security Ledger" template for establish a new cipher.
- **Reservation Updates**: Themed "Greetings" emails for approval/rejection.
- **Contact Inquiries**: "Imperial Inquiry" format for admin notifications.

---

## 📜 Noble Credits
Developed by the **Imperial Engineering Team** for the *Ocean View Resort & Imperial Spa*.
&copy; 2026 Ocean View Resort. All Noble Rights Reserved.
