
# Ayurkisan-Ecommerce – VS Code Extensions Guide

This project is a **Full Stack E-Commerce Application** built using:

- **Frontend:** React.js
- **Backend:** Spring Boot (Java)
- **Database:** MongoDB Atlas
- **IDE:** Visual Studio Code (VS Code)

To develop, run, and understand this project smoothly in **VS Code**, the following extensions are **required and recommended**.

---

## 🔹 Mandatory VS Code Extensions (Install These First)

### 1️⃣ Java Extension Pack (Required for Backend)
**Publisher:** Microsoft  

This is the most important extension for running the Spring Boot backend.

Includes:
- Java Language Support
- Java Debugger
- Maven for Java
- Test Runner for Java
- Project Manager for Java

📌 Without this extension, Java and Spring Boot code will not work properly.

---

### 2️⃣ Spring Boot Extension Pack
**Publisher:** VMware  

Helps you work easily with Spring Boot.

Features:
- Run Spring Boot applications
- Spring Initializr support
- Spring Boot Dashboard

📌 Recommended for backend development and debugging.

---

### 3️⃣ ES7+ React/Redux Snippets
**Publisher:** dsznajder  

Required for faster React development.

Provides:
- React component shortcuts
- Arrow function snippets
- Hooks snippets

📌 Very useful for frontend files like `Home.js`, `Login.js`, `Products.js`, etc.

---

### 4️⃣ Prettier – Code Formatter
**Publisher:** Prettier  

Automatically formats code for:
- JavaScript
- React (JSX)
- CSS
- JSON

📌 Keeps frontend code clean and readable.

---

### 5️⃣ ESLint
**Publisher:** Microsoft  

Helps find:
- JavaScript errors
- React best-practice issues

📌 Recommended to avoid frontend bugs.

---

## 🔹 Database & API Extensions

### 6️⃣ MongoDB for VS Code
**Publisher:** MongoDB  

Used to:
- Connect MongoDB Atlas
- View databases & collections
- Run queries directly from VS Code

📌 Required for backend database work.

---

### 7️⃣ REST Client
**Publisher:** Huachao Mao  

Allows you to:
- Test REST APIs inside VS Code
- Send GET, POST, PUT, DELETE requests

📌 Useful alternative to Postman.

---

## 🔹 UI & Productivity Extensions (Recommended)

### 8️⃣ Auto Rename Tag
Automatically renames matching HTML/JSX tags.

---

### 9️⃣ Path Intellisense
Gives auto-suggestions for file paths in imports.

---

### 🔟 Material Icon Theme
Improves folder and file icons for better readability.

---

### 1️⃣1️⃣ DotENV
Provides syntax highlighting for `.env` files.

📌 Useful for:
- `frontend/.env`
- `backend/.env`

---

## 🔹 Optional (But Helpful)

- **Thunder Client** – API testing tool
- **GitLens** – Advanced Git support
- **Live Server** – For static frontend testing

---

## 🛠 How to Install Extensions

1. Open **VS Code**
2. Press **Ctrl + Shift + X**
3. Search the extension name
4. Click **Install**

---

## ✅ Minimum Required Extensions (Quick List)

If you want only the essentials, install these:

- Java Extension Pack
- Spring Boot Extension Pack
- ES7+ React Snippets
- Prettier
- ESLint
- MongoDB for VS Code
- Material Icon Theme

---

## 🚀 You Are Ready!

After installing these extensions:
- Frontend will run smoothly using React
- Backend will run properly using Spring Boot
- MongoDB Atlas can be accessed from VS Code

Happy Coding! 🎉

## DB Name and Passwords:

Name :Ayurkisan-Ecommerce
Password :Ayurkisan2026

## To Run Backend use this command-
mvn -q spring-boot:run 
or
mvn clean spring-boot:run

## Swagger URL -
http://localhost:8080/swagger-ui/index.html

## AYURKISAN BACKEND – API ROUTES DOCUMENT
USER APIs-
Base URL - http://localhost:8080
1️⃣ Customer Registration - POST - /api/auth/customer/register
Body Example -
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "phoneNumber": "9876543210",
  "address": "Pune",
  "password": "john123"
}
2️⃣ Retailer Registration - POST - /api/auth/retailer/register
Body Example -
{
  "retailerName": "Ramesh",
  "firmName": "Ramesh Agro",
  "registrationId": "REG123",
  "address": "Mumbai",
  "phoneNumber": "9876543210",
  "email": "retailer@gmail.com",
  "password": "retailer123"
}

3️⃣ Admin Registration - POST - /api/auth/admin/register
Request Body -
{
  "name": "Super Admin",
  "email": "admin@gmail.com",
  "phoneNumber": "9876543210",
  "address": "Pune",
  "password": "admin123"
}

4️⃣ Login (Customer / Retailer / Admin) - POST - /api/auth/login
Request Body -
{
  "email": "admin@gmail.com",
  "password": "admin123",
  "role": "ADMIN"
}

ADMIN MODULE - 
1️⃣ View All Customers - GET - /api/admin/customers
2️⃣ View All Retailers - GET - /api/admin/retailers
3️⃣ Recover Customer - PUT - /api/admin/recover/customer/{id}
4️⃣ Recover Retailer - PUT - /api/admin/recover/retailer/{id}

CUSTOMER MODULE APIs - 
1️⃣ Update Customer Profile - PUT - /api/customer/update/{id}
Request Body - 
{
  "name": "Updated Name",
  "phoneNumber": "9876543210",
  "address": "Updated Address"
}

2️⃣ Delete Customer (Soft Delete)- PUT - /api/customer/delete/{id}

RETAILER MODULE APIs -
1️⃣ Update Retailer Profile - PUT - /api/retailer/update/{id}
Request Body
{
  "retailerName": "Ramesh",
  "firmName": "Ramesh Agro",
  "registrationId": "REG123",
  "address": "Mumbai",
  "phoneNumber": "9876543210",
  "email": "retailer@gmail.com",
  "password": "retailer123"
}

2️⃣ Delete Retailer (Soft Delete) - PUT - /api/retailer/delete/{id}