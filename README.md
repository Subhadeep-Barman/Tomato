# Tomato - Full Stack Food Delivery Application

A complete, production-ready food delivery platform built with modern web technologies. Tomato provides a seamless experience for customers to browse food, place orders, and for administrators to manage the delivery service.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://tomato-gules.vercel.app/)
---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Database Schema](#database-schema)
- [Features in Detail](#features-in-detail)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Tomato** is a comprehensive food delivery system designed with three separate applications:

1. **Frontend** - Customer-facing web application for browsing and ordering food
2. **Admin Dashboard** - Administrator panel for managing food items, orders, and deliveries
3. **Backend API** - RESTful API server handling business logic and data management

The application supports user authentication, food catalog management, shopping cart functionality, order processing, and payment integration with Stripe.

---

## Features

### Customer Features
- **User Authentication**: Secure registration and login with JWT tokens
- **Food Browsing**: Browse food items by category with detailed descriptions
- **Shopping Cart**: Add/remove items, manage quantities
- **Order Placement**: Complete checkout with delivery address
- **Payment Integration**: Stripe payment processing
- **Order Tracking**: View order status and history
- **Responsive Design**: Mobile-friendly interface

### Admin Features
- **Admin Authentication**: Secure login for administrators
- **Food Management**: Add, edit, and delete food items
- **Food Upload**: Image upload functionality for food items
- **Order Management**: View and manage all orders
- **Order Status Updates**: Update order processing status
- **Dashboard**: Overview of all operations

### Security Features
- **Password Hashing**: Bcrypt encryption for secure password storage
- **JWT Authentication**: Token-based authentication for all protected routes
- **Email Validation**: Email format and uniqueness validation
- **Role-Based Access**: User and admin role differentiation
- **CORS**: Cross-Origin Resource Sharing configured

---

## 🛠 Tech Stack

### Frontend & Admin (React + Vite)
- **React 18.3.1** - UI library
- **Vite 5.3.4** - Build tool and dev server
- **React Router DOM 6** - Client-side routing
- **Axios 1.7.3** - HTTP client for API requests
- **React Toastify 10.0.5** - Toast notifications
- **CSS3** - Styling with custom CSS files

### Backend (Node.js + Express)
- **Node.js** - JavaScript runtime
- **Express 4.19.2** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.5.2** - MongoDB ODM
- **JWT** - Authentication tokens
- **Bcrypt 5.1.1** - Password hashing
- **Multer 1.4.5** - File upload handling
- **Stripe 16.6.0** - Payment processing
- **Nodemon 3.1.4** - Development server auto-reload
- **CORS 2.8.5** - Cross-origin support
- **Validator 13.12.0** - Data validation

---

## 🏗 Architecture

### System Architecture

```
┌─────────────────┐
│   Frontend      │
│  (React + Vite) │
└────────┬────────┘
         │
         │ HTTP/HTTPS
         │
┌────────▼────────────────────┐
│   Backend API               │
│  (Express.js)               │
│  ├── User Routes            │
│  ├── Food Routes            │
│  ├── Cart Routes            │
│  └── Order Routes           │
└────────┬────────────────────┘
         │
         │ Mongoose ODM
         │
┌────────▼────────────────────┐
│   MongoDB Database          │
│  ├── Users Collection       │
│  ├── Foods Collection       │
│  ├── Orders Collection      │
│  └── Cart Data              │
└─────────────────────────────┘

┌─────────────────┐
│   Admin Panel   │
│  (React + Vite) │
└────────┬────────┘
         │
         └──────┐
                │ HTTP/HTTPS
                │
        (Same Backend API)
                │
         (Database Access)
```

### Data Flow

1. **User Registration/Login**
   - User submits credentials
   - Backend validates and hashes password with Bcrypt
   - JWT token generated and returned
   - Token stored in browser localStorage

2. **Food Browsing**
   - Frontend fetches food list from backend
   - Foods filtered by category
   - Images served from backend uploads folder

3. **Order Processing**
   - User adds items to cart (stored in React context)
   - User proceeds to checkout
   - Backend creates order in MongoDB
   - Stripe payment gateway processes payment
   - Order status updated in database

4. **Admin Operations**
   - Admin logs in with admin credentials
   - Can add new food items with images
   - Can view and update order statuses

---

## 📁 Project Structure

```
Tomato/
├── frontend/                          # Customer-facing application
│   ├── src/
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # Entry point
│   │   ├── index.css                 # Global styles
│   │   ├── components/
│   │   │   ├── Navbar/               # Navigation bar
│   │   │   ├── Footer/               # Footer component
│   │   │   ├── LoginPopup/           # Login modal
│   │   │   ├── FoodItem/             # Food card component
│   │   │   ├── FoodDisplay/          # Food listing
│   │   │   ├── ExploreMenu/          # Category filter
│   │   │   ├── Header/               # Page header
│   │   │   └── AppDownload/          # Download prompt
│   │   ├── pages/
│   │   │   ├── Home/                 # Landing page
│   │   │   ├── Cart/                 # Shopping cart
│   │   │   ├── PlaceOrder/           # Checkout page
│   │   │   ├── Verify/               # Payment verification
│   │   │   └── MyOrders/             # Order history
│   │   ├── context/
│   │   │   └── StoreContext.jsx      # Global state management
│   │   ├── assets/
│   │   │   └── frontend_assets/      # Images and icons
│   │   └── public/
│   │       └── [static files]
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── admin/                             # Admin dashboard
│   ├── src/
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # Entry point
│   │   ├── index.css                 # Global styles
│   │   ├── components/
│   │   │   ├── Navbar/               # Admin navbar
│   │   │   ├── Sidebar/              # Navigation sidebar
│   │   │   └── Login/                # Admin login
│   │   ├── pages/
│   │   │   ├── Add/                  # Add food item page
│   │   │   ├── List/                 # Food items list
│   │   │   └── Orders/               # Order management
│   │   ├── assets/
│   │   └── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── backend/                           # Server & API
│   ├── server.js                     # Entry point
│   ├── package.json
│   ├── config/
│   │   └── db.js                     # MongoDB connection
│   ├── models/
│   │   ├── userModel.js              # User schema
│   │   ├── foodModel.js              # Food schema
│   │   └── orderModel.js             # Order schema
│   ├── controllers/
│   │   ├── userController.js         # Auth logic
│   │   ├── foodController.js         # Food operations
│   │   ├── cartController.js         # Cart logic
│   │   └── orderController.js        # Order processing
│   ├── routes/
│   │   ├── userRoute.js              # /api/user
│   │   ├── foodRoute.js              # /api/food
│   │   ├── cartRoute.js              # /api/cart
│   │   └── orderRoute.js             # /api/order
│   ├── middleware/
│   │   └── auth.js                   # JWT verification
│   └── uploads/                      # Food item images
│
├── README.md                          # This file
└── LICENSE
```

---

## 💻 Installation & Setup

### Prerequisites

- **Node.js** v16+ and **npm** or **yarn**
- **MongoDB** (local or Atlas cloud)
- **Stripe Account** (for payment processing)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Subhadeep-Barman/Tomato
cd Tomato
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

### 4. Admin Setup

```bash
cd ../admin

# Install dependencies
npm install
```

---

## 🎨 Features in Detail

### User Authentication
- **Registration**: Validates email format, minimum password length (8 characters)
- **Login**: Email and password verification with bcrypt
- **JWT Tokens**: Stateless authentication with expiring tokens
- **Role-Based Access**: Different permissions for users and admins

### Food Management
- **Browse by Category**: Filter foods by type (pizza, burgers, salad, etc.)
- **Image Upload**: Admin can upload food item images
- **Dynamic Pricing**: Food items have individual prices
- **Full CRUD**: Add, read, update, delete operations for food items

### Shopping Cart
- **Local & Remote Storage**: Cart data synced with user profile
- **Quantity Management**: Add/remove items, adjust quantities
- **Persistent Cart**: Cart data saved in database (tied to user account)

### Order Management
- **Order Placement**: Complete checkout with delivery details
- **Payment Processing**: Stripe integration for secure payments
- **Order Tracking**: Users can view order history and status
- **Admin Dashboard**: Admins can update order statuses in real-time

### Security Measures
- **Password Hashing**: Bcrypt with salt rounds for secure storage
- **JWT Authentication**: Token-based access to protected routes
- **Email Validation**: Validator library for email format checking
- **CORS Policy**: Configured to allow frontend-backend communication
- **Role-Based Middleware**: Protects admin-only routes

---

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy the 'dist' folder to Vercel or Netlify
```

### Admin Deployment (Vercel/Netlify)

```bash
cd admin
npm run build
# Deploy the 'dist' folder to Vercel or Netlify
```

### Backend Deployment (Heroku/Render)

Current backend is deployed at: `https://food-delivery-backend-5b6g.onrender.com`

For custom deployment:
```bash
# Push to Heroku
git push heroku main

# Set environment variables on hosting platform
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Tomato Development Team**

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Email: barmansubha02@gmail.com

---

## 🔗 Useful Links

- [Express.js Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Stripe Documentation](https://stripe.com/docs)
- [JWT Documentation](https://jwt.io)

---

