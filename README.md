<h1 align="center">Hakomerch - Product Store 🚀</h1>

![Demo App](/frontend/public/demo.png)

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v16.0.0-green" alt="Node.js">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="License">
  <img src="https://img.shields.io/badge/React-v18.2.0-blue" alt="React">
</p>

---

## 🌟 About

- ⚛️ **React.js** and **Tailwind CSS** for a responsive and elegant UI.
- 🔥 **API Development** with Express.js.
- 🌐 **Database Integration** using MongoDB.
- 🐞 **Error Handling** and smooth user experience.

---

## 🛠️ **Setup Instructions**

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### **1. Clone the Repository**

```bash
git clone https://github.com/hakkuuuu/hakomerch-product-store.git
cd hakomerch-product-store
```

### **2. Install backend and frontend dependencies**

```bash

cd .\backend\
npm install

npm .\frontend\
npm install
```

### **3. Setup .env file**

```bash

MONGO_URI=your_mongo_connection_string
PORT=5000
Replace your_mongo_connection_string with your MongoDB connection string (e.g., from MongoDB Atlas).

```

### **4. Start the app**

```bash
# Start the backend
cd .\backend\
npm run dev

# Start the frontend
npm .\frontend\
npm start

The backend will run on http://localhost:5000, and the frontend will be available at http://localhost:5173.
```
## 🔧 Notes
- Ensure your MongoDB database is running and accessible.
- If using MongoDB Atlas, whitelist your IP address in the Atlas dashboard.

## 📝 License
This project is licensed under the MIT License. You are free to use, modify, and redistribute this project in any way you want.