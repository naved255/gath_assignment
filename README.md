# 🌊 ABYSS OS — Full-Stack Authentication & Dashboard Application

A full-stack web application featuring user authentication (Registration, JWT Login, Token Refresh, and Logout) built with the **MERN Stack** and styled with modern futuristic UI components.

---

## 🚀 Live Deployment Links

* **Frontend App:** [https://gath-assignment.vercel.app](https://gath-assignment.vercel.app)
* **Backend API:** Hosted on [Render](https://render.com)
* **Database:** Hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🛠 Tech Stack

* **Frontend:** React.js, Vite, React Router DOM, Framer Motion, React Icons, Axios
* **Backend:** Node.js, Express.js, JSON Web Tokens (JWT), Bcrypt.js
* **Database:** MongoDB Atlas with Mongoose ODM
* **Deployment:** Vercel (Frontend), Render (Backend)

---

## 🏗 System Architecture

The application follows a **Decoupled Client-Server Architecture**:

## 🔑 Authentication & Token Flow

The system uses a **Dual-Token System** (Short-lived Access Token + Long-lived Refresh Token) to balance security and seamless user experience:

1. **Access Token:** Short-lived JWT stored in memory / `localStorage` on the client. It is sent via the `Authorization` header (`Bearer <token>`) for protected API requests.
2. **Refresh Token:** Long-lived JWT stored inside an **`HttpOnly` Cookie** issued by the server. This prevents client-side JavaScript from accessing or exposing the refresh token to XSS attacks.
3. **Logout:** Triggers a server route to clear the `HttpOnly` cookie and wipes the client-side access token from `localStorage`.

---

## 🌐 Platform Selection & Deployment Rationale

| Component | Platform | Rationale |
| :--- | :--- | :--- |
| **Frontend** | **Vercel** | Optimized for Vite/React Single Page Applications, provides global CDN distribution, and automated CI/CD deployments directly from Git pushes. |
| **Backend** | **Render** | Native support for Node.js runtime environments, seamless handling of environment variables, and automatic SSL provisioning for cross-origin HTTPS requests. |
| **Database** | **MongoDB Atlas** | Managed cloud document store offering high availability, flexible JSON schema mapping with Mongoose, and reliable cloud persistence. |

---

## 📂 Project Structure

```text
gath_assignment/
├── gath_assign_backend/        # Node.js & Express API
│   ├── Schema/                 # Mongoose Data Models
│   │   └── userSchema.js
│   ├── index.js                # Server entry point & routes
│   └── package.json
│
└── gath_assign_frontent/       # React & Vite Frontend
    ├── src/
    │   ├── components/         # Navigation, Floating Bubbles, Cards
    │   ├── pages/              # LoginPage, RegisterPage, Dashboard
    │   └── styles/             # Modular CSS styles
    ├── vercel.json             # SPA routing rewrite configuration
    └── package.json