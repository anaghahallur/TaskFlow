# TaskFlow / Primetrade.ai

A full-stack, production-ready MERN (MongoDB, Express, React, Node.js) administrative dashboard. 

## 🌐 Live Links
- **Frontend (Live)**: [https://task-flow-lyart-eight.vercel.app](https://task-flow-lyart-eight.vercel.app)
- **Backend API (Live)**: [https://taskflow-c1pa.onrender.com](https://taskflow-c1pa.onrender.com)
- **Separate Documents**: 
  - [API_Documentation.md](./API_Documentation.md)
  - [Scalability_Note.md](./Scalability_Note.md)

## 🚀 Deliverables Completed

1. **Backend Hosted & Documented**: Fully dockerized backend hosted in GitHub with this detailed `README.md`.
2. **Working Auth & CRUD APIs**: JWT HTTP-Only secure authentication. Full CRUD APIs for Products, Users, and Settings.
3. **Frontend UI**: A beautiful, premium, adaptive React (Vite) frontend with Tailwind CSS and Framer Motion that flawlessly consumes the backend API.
4. **API Documentation**: Interactive **Swagger UI** generated and accessible on the backend (`/api-docs`).
5. **Scalability Note**: Detailed system architecture scaling notes included at the bottom of this README.

---

## 💻 Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Recharts, React Hot Toast, Axios.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Nodemailer, Swagger-UI.
- **Security**: JWT (HTTP-Only Cookies), Helmet, Bcryptjs, CORS.
- **Deployment**: Docker, Docker Compose, Nginx.

---

## 🛠️ How to Run Locally

### Using Docker (Recommended)
You can boot the entire database, backend, and frontend cluster with a single command:
```bash
docker-compose up -d --build
```
- Frontend will run on `http://localhost:8080`
- Backend API will run on `http://localhost:5001`

### Using NPM (Development Mode)
**1. Start the Backend:**
```bash
cd server
npm install
npm run dev
```

**2. Start the Frontend:**
```bash
cd client
npm install
npm run dev
```

---

## 📖 API Documentation (Swagger)
The backend uses **Swagger UI** for interactive API documentation.
Once the server is running, visit:
`http://localhost:5001/api-docs`

This interface allows you to view all Authentication and CRUD routes, inspect required JSON payloads, and test the endpoints directly from your browser.

---

## 📈 Scalability Note & Future Architecture

While this application currently uses a monolithic MERN architecture suitable for MVPs and medium-traffic dashboards, it is designed with boundaries that allow for seamless scaling as traffic grows.

### 1. Caching (Redis)
To reduce database load and decrease API latency, **Redis** can be implemented.
- **Query Caching**: Frequent, read-heavy endpoints like `GET /api/v1/products` can be cached in Redis. If a product is added or updated, the cache is invalidated.
- **Session Store**: While we currently use stateless JWTs, any stateful rate-limiting or user lockout mechanisms can be offloaded to Redis for sub-millisecond retrieval.

### 2. Microservices Architecture
If the platform grows to include complex features (e.g., Heavy Data Analytics, Billing/Payments), the Node.js monolith can be split:
- **Auth Service**: Dedicated entirely to JWT generation and validation.
- **Inventory Service**: Handles product CRUD operations.
- **Notification Service**: We currently use a synchronous Nodemailer flow. At scale, email triggers should be pushed to a message broker (like **RabbitMQ** or **Apache Kafka**) where an isolated Notification Microservice consumes the events and dispatches emails asynchronously.

### 3. Load Balancing & Database Sharding
- **Horizontal Scaling**: The Node.js backend is completely stateless (sessions are in JWT cookies). This means we can spin up 10+ identical Docker containers behind an **Nginx Load Balancer** or an AWS Application Load Balancer to distribute traffic evenly.
- **Database Scalability**: As the MongoDB database grows, we can utilize MongoDB Atlas **Read Replicas** to route heavy `GET` requests away from the primary write-database, and eventually implement **Sharding** to distribute data across multiple geographic clusters.
