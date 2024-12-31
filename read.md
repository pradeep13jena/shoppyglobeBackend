# Shoppyglobe Backend Documentation

Welcome to the backend documentation for Shoppyglobe, your global shopping companion. This document provides details about validation, authentication, routes, getting started, technologies used, and supporting documents.

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Routes](#2-routes)
3. [Validation](#3-validation)
4. [Authentication](#4-authentication)
5. [Technologies Used](#5-technologies-used)
6. [Credits](#6-credits)
7. [Contacts](#7-contact)

---

## 1. Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/username/shoppyglobe-backend.git
   cd shoppyglobe-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## 2. Routes

### User Routes
- **POST /register** - Register a new user.
- **POST /login** - Authenticate and login a user.

### Product Routes
- **GET /products** - Fetch all products.
- **GET /products/:id** - Fetch a product by ID.

### Cart Routes
- **GET /carts** - Fetch all orders (protected).
- **POST /carts** - Add a item to the cart.
- **PUT /carts/** - Edit quantity of the cart item.
- **DELETE / carts** - Delete a item from cart
---

## 3. Validation

Validation ensures data integrity and a secure flow of information. The following validations are implemented:

- **User name Validation:**
  - Username validation.
  - Two users cannot have same username.
  - Required fields for registration and login.
  
- **Password validation**
	- Password cannot be empty.
	- Cannot be empty Strings or other data types.
	- Only Strings are accepted

- **Product Data Validation:**
  - Ensure all product fields (name, price, description, category) are provided.
  - Validate the price as a positive number.

---

## 4. Authentication

Authentication mechanisms ensure secure access to Shoppyglobe resources. It includes:

- **JWT (JSON Web Token):**
  - Tokens are issued on successful login and must be included in the Authorization header for protected routes.
  - Tokens expire after a specified time for added security.

- **Password Hashing:**
  - User passwords are securely hashed using **bcrypt** before being stored in the database.
  
---

## 5. Technologies Used

- **Mongoose**: ODM library for MongoDB.
- **MongoDB**: Database for storing application data.
- **JWT**: Secure user authentication.
- **Express**: Backend framework for Node.js.
- **Bcrypt**: Hashing library for secure password storage.
- **JavaScript**: Core programming language.
- **Postman**: API testing tool.
- Other supporting libraries.

---

## 6. Credits

- **Mongoose:** For schema design and interaction with MongoDB.
- **MongoDB:** For data storage.
- **JWT:** For token-based authentication.
- **Express:** For building backend APIs.
- **Bcrypt:** For password hashing and security.

---

## 7. Contact

- [E-mail](goldrushatjenas@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/pradeepjena/)
- [Portfolio Project](https://pradeepjena.netlify.app/)