# Hakomerch Product Store

A modern MERN stack e-commerce platform for K-pop merchandise, featuring a clean UI and efficient state management.

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload handling
- **dotenv** - Environment configuration
- **cross-env** - Cross-platform environment variables

### Frontend
- **React** (v18.3) - UI library
- **Vite** (v6.0) - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** (v7.1) - Client-side routing
- **Zustand** - Lightweight state management
- **React Toastify** - Toast notifications

## ✨ Features

- **Product Management**
  - Create, read, update, and delete products
  - Image upload and management
  - Product categorization
  - Stock tracking
  - Brand management

- **User Interface**
  - Responsive design with Tailwind CSS
  - Toast notifications for user feedback
  - Clean and modern UI
  - Category-based product browsing
  - Detailed product views

- **State Management**
  - Zustand for efficient state handling
  - Centralized product store
  - Async actions for API calls
  - Optimistic updates

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

### Environment Setup
Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
DEBUG=true
MONGO_URI=your_mongodb_uri
UPLOADS_DIR=uploads/
VITE_API_URL=http://localhost:3000
```

### Installation

1. **Clone and Install Dependencies**
```bash
git clone <repository-url>
cd hakomerch-product-store

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

2. **Start Development Servers**

Backend (from root directory):
```bash
npm run dev
```

Frontend (from frontend directory):
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Database Seeding
Populate the database with sample products:
```bash
npm run seed
```

## 📁 Project Structure

```
hakomerch-product-store/
├── backend/
│   ├── config/
│   │   ├── db.js         # Database configuration
│   │   ├── multer.js     # File upload configuration
│   │   └── seeder.js     # Database seeding
│   ├── controllers/
│   │   └── product.controller.js
│   ├── models/
│   │   └── product.model.js
│   ├── routes/
│   │   └── product.routes.js
│   ├── uploads/          # Product images storage
│   └── server.js         # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CollectionsCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── NavBar.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CreatePage.jsx
│   │   │   ├── EditPage.jsx
│   │   │   └── CollectionsPage.jsx
│   │   ├── store/
│   │   │   └── product.js    # Zustand store
│   │   └── App.jsx
│   └── vite.config.js
└── package.json
```

## 📝 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 🔧 State Management with Zustand

The application uses Zustand for state management, providing a simple and efficient solution:

```javascript
// store/product.js
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  // ... other actions
}));
```

## 🎨 Styling

The project uses Tailwind CSS for styling, providing:
- Responsive design
- Custom components
- Utility-first approach
- Modern UI elements

## 🔐 Environment Modes

### Development
```bash
npm run dev
```
- Hot reloading
- Debug logging
- Development server

### Production
```bash
npm start
```
- Optimized build
- Minimized assets
- Production-ready

## 🐳 Docker Deployment

### Local Docker Development
1. **Build and run with Docker Compose**
```bash
# Build and start containers
docker-compose up --build

# Stop containers
docker-compose down
```

2. **Build and run Docker image directly**
```bash
# Build image
docker build -t hakomerch-store .

# Run container
docker run -p 3000:3000 --env-file .env hakomerch-store
```

## 🚀 Render Deployment

### Prerequisites
1. Create a [Render](https://render.com) account
2. Fork/push this repository to your GitHub account

### Deployment Steps

1. **Create New Web Service**
   - Go to Render Dashboard
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository

2. **Configure Web Service**
   - Name: `hakomerch-product-store`
   - Environment: `Docker`
   - Branch: `main` (or your preferred branch)
   - Region: Choose nearest to your users
   - Instance Type: Choose based on your needs

3. **Environment Variables**
   Add the following environment variables:
   ```
   NODE_ENV=production
   PORT=3000
   MONGO_URI=your_mongodb_uri
   UPLOADS_DIR=uploads/
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build and deployment to complete

### Continuous Deployment
- Render automatically deploys when you push to your repository
- Monitor builds in the Render dashboard
- View logs and metrics in real-time

### File Storage
For uploaded files in production:
1. Create a persistent disk in Render
2. Mount it to `/app/backend/uploads`
3. Update environment variables accordingly

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.