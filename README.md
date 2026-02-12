# MedCare - Pharmacy Management System

MedCare is a comprehensive, responsive web-based Pharmacy Management System designed to streamline the interaction between customers and the pharmacy. It features a modern user interface, role-based authentication (Admin/Customer), an interactive shopping experience, and secure payment simulation.

## 🚀 Introduction

The goal of this project is to provide a seamless digital platform for purchasing medicines, managing inventory, and handling prescriptions. It bridges the gap between traditional pharmacy operations and modern e-commerce needs.

## 🌐 Live Demo

Check out the live version here: [**MedCare Live**](https://med-care-self.vercel.app)

## 📦 Modules Designed

### 1. **Authentication Module**

- **Role-Based Access**: Secure login for both Administrators and Customers.
- **Dynamic Routing**: Redirects users to their respective dashboards (Admin Dashboard or Shop) based on credentials.

### 2. **Shop & Product Discovery**

- **Product Grid**: Displays medicines with images, prices, and "Add to Cart" functionality.
- **Category Filtering**: Interactive sidebar to filter products by category (e.g., Pain Relief, First Aid).
- **Sorting**: Custom dropdown to sort products by Price (Low/High) or Featured.
- **Search**: Real-time search functionality (UI).

### 3. **Cart & Checkout System**

- **Persistent Cart**: Items are saved in local storage, persisting across page reloads.
- **Interactive Drawer**: Slide-out cart drawer for quick access to added items.
- **Management**: Users can increase/decrease quantity or remove items directly from the drawer.
- **Payment Simulation**:
  - Secure checkout form.
  - **Razorpay-style Animation**: A realistic verification overlay with a 3D coin flip animation.
  - Multiple payment modes (Card, UPI, COD).

### 4. **Prescription Management**

- **Upload Interface**: Dedicated page (`upload-prescription.html`) for users to upload medical prescriptions.
- **Drag & Drop**: User-friendly drag-and-drop zone for file uploads.
- **Feedback**: Instant toast notifications upon successful upload.

### 5. **Admin Dashboard**

- **Overview**: Stats card showing Total Sales, Active Orders, and Low Stock alerts.
- **Inventory Management**: Tabular view to add, edit, or delete medicine stock.
- **User Management**: View registered customers.

## 📸 Screenshots

### Landing Page & Shop

![Shop UI](assets/img/hero-illustration.png)
_(Note: Replace with actual screenshot of Shop Page)_

### Interactive Cart

_(Note: Replace with screenshot of Cart Drawer)_

### Secure Payment Animation

_(Note: Replace with screenshot of Payment Overlay)_

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Modern Variables, Flexbox/Grid), JavaScript (ES6+)
- **Icons**: Phosphor Icons
- **Fonts**: Google Fonts (Inter)
- **Animation**: CSS Keyframes (Fade-ins, Slide-ups, 3D Transforms)

## 🔧 Setup & Usage

1. Clone the repository.
2. Open `index.html` in any modern web browser.
3. **Login Credentials** (Mock):
   - **Admin**: `admin@medcare.com` / `admin123`
   - **Customer**: `user@gmail.com` / `123456`
