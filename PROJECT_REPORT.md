# Project Report: MedCare Pharmacy Management System

## **Project Title**

**MedCare - Pharmacy Management System**

## **Team Members**

- **Rajat Rokade**
- **Shreyas Meshram**
- **Gaurav Loharkar**

---

## **Modules Designed**

### **1. Authentication Module**

The system begins with a secure login interface that supports Role-Based Access Control (RBAC).

- **Customer Login**: Provides access to the shop, personal cart, and order history.
- **Admin Login**: Grants access to the administrative dashboard for inventory and sales management.
- **Dynamic Routing**: Automatically redirects users to their appropriate dashboard upon successful authentication.

### **2. Shop & Product Discovery Module**

This is the core customer-facing interface designed for an optimal shopping experience.

- **Product Catalog**: Displays a grid of available medicines with high-quality images, pricing, and key details.
- **Category Filtering**: An interactive sidebar allows users to filter products by categories such as "Pain Relief", "First Aid", and "Vitamins".
- **Advanced Sorting**: A custom dropdown feature enables sorting by Price (Low to High / High to Low) and Featured items.
- **Smart Search UI**: Includes a search bar for quick product lookup.

### **3. Cart & Checkout Module**

A robust system for managing purchases and processing orders.

- **Persistent Shopping Cart**: Leverages local storage to save cart items even if the browser is closed.
- **Slide-Out Cart Drawer**: Allows users to view and edit cart contents (update quantities, remove items) without leaving the shop page.
- **Secure Checkout Flow**: A dedicated checkout page captures shipping details and order summary.
- **Payment Gateway Simulation**: Features a realistic Razorpay-style payment overlay with custom animations (progress strip and 3D coin flip) for verify secure transactions.

### **4. Prescription Management Module**

A specialized module to handle prescription-required medicines.

- **Upload Interface**: A dedicated page allows customers to upload digital copies of their prescriptions.
- **Drag & Drop Support**: Users can easily drag and drop files (Images/PDFs) for upload.
- **Instant Feedback**: The system provides immediate visual confirmation (Toast Notifications) upon successful upload.

### **5. Administrative Dashboard Module**

A centralized control panel for pharmacy owners/managers.

- **Overview Stats**: Visual cards displaying key metrics like Total Sales, Active Orders, and Low Stock Alerts.
- **Inventory Management**: A tabular interface to view current stock levels, enabling efficient inventory tracking.
- **User Management**: Basic view of registered customers to manage the user base.
