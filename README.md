# Job Board API

A backend API built with Node.js, Express, and MongoDB for job recruitment operations.

## 🚀 Features

- RESTful API with Express.js  
- MongoDB database with Mongoose ORM  
- User authentication with JWT  
- CRUD operations for job recruitment operations 
- Pagination, filtering, and search support  
- Input validation and error handling  

## 📋 Prerequisites

- Node.js (v14 or higher)  
- MongoDB (v4 or higher)  
- npm or yarn package manager  

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/jobboard-api.git
cd jobboard-api
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:

```env
MONGO_URI="mongodb://localhost/jobboard_db"
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

4. (Optional) Seed the database with initial data:

```bash
npm run db:seed
```

## 🚦 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## 🗄️ Database Configuration

- The API uses MongoDB with Mongoose  
- Make sure your MongoDB instance is running  
- Update the `MONGO_URI` in `.env` to connect to your database

## 🔒 Environment Variables

| Variable   | Description                         | Example                           |
| ---------- | --------------------------------- | --------------------------------- |
| MONGO_URI  | MongoDB connection string          | mongodb://localhost/jobboard_db  |
| PORT       | Port for the API server            | 5000                            |
| JWT_SECRET | Secret key for JWT authentication  | your_jwt_secret_key              |

## 🛠️ Tech Stack

- [Node.js](https://nodejs.org/)  
- [Express.js](https://expressjs.com/)  
- [MongoDB](https://www.mongodb.com/)  
- [Mongoose](https://mongoosejs.com/)  
- [JWT](https://jwt.io/)  
- [TypeScript](https://www.typescriptlang.org/)    

## 📄 License

[Add your license here]

## 👥 Authors

[Your Name / Team Name]  
[Contact Information or GitHub Profile]
