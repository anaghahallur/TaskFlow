# Primetrade.ai API Documentation

## Base URLs
- **Production**: `https://primetrade-api.onrender.com/api/v1`
- **Development**: `http://localhost:5001/api/v1`

## Authentication

All protected routes require a JWT token passed via an HTTP-Only Cookie (`jwt`).

### 1. Register User
- **Endpoint**: `POST /auth/register`
- **Description**: Creates a new user account.
- **Request Body (JSON)**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Responses**:
  - `201 Created`: User successfully registered.
  - `400 Bad Request`: User already exists or invalid data.

### 2. Login User
- **Endpoint**: `POST /auth/login`
- **Description**: Authenticates a user and sets the HTTP-Only JWT cookie.
- **Request Body (JSON)**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Responses**:
  - `200 OK`: Successful login.
  - `401 Unauthorized`: Invalid email or password.

---

## Products (CRUD)

### 3. Get All Products
- **Endpoint**: `GET /products`
- **Description**: Retrieves a list of all products in the inventory.
- **Security**: None (Public)
- **Responses**:
  - `200 OK`: Returns an array of product objects.

### 4. Create Product
- **Endpoint**: `POST /products`
- **Description**: Adds a new product to the inventory.
- **Security**: Requires Authentication (Cookie)
- **Request Body (JSON)**:
  ```json
  {
    "name": "Wireless Mouse",
    "price": 29.99,
    "stock": 100,
    "category": "Electronics",
    "description": "Ergonomic wireless mouse."
  }
  ```
- **Responses**:
  - `201 Created`: Product successfully added.
  - `401 Unauthorized`: Not logged in.

### 5. Update Product
- **Endpoint**: `PUT /products/:id`
- **Description**: Updates an existing product by its MongoDB ID.
- **Security**: Requires Authentication (Cookie)
- **Request Body (JSON)**: (Any field to update)
  ```json
  {
    "price": 24.99,
    "stock": 85
  }
  ```
- **Responses**:
  - `200 OK`: Product successfully updated.
  - `404 Not Found`: Product ID does not exist.

### 6. Delete Product
- **Endpoint**: `DELETE /products/:id`
- **Description**: Removes a product from the database.
- **Security**: Requires Authentication (Cookie)
- **Responses**:
  - `200 OK`: Product successfully deleted.
  - `404 Not Found`: Product ID does not exist.
