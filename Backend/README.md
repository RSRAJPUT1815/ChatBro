
# ChatBro Backend

Node.js backend for the ChatBro chat application, built with Express, MongoDB, and Socket.IO.

## Features

- RESTful API for user authentication and messaging
- Real-time chat with Socket.IO
- MongoDB database integration
- CORS enabled for frontend communication
- Modular route, controller, and middleware structure

## Project Structure

```
Backend/
├── controllers/
│   ├── messageController.js
│   └── userController.js
├── middleware/
│   └── auth.js
├── routes/
│   ├── messageRoute.js
│   └── userRoutes.js
├── lib/
│   ├── db.js
│   ├── cloudinary.js
│   └── utils.js
├── models/
│   ├── message.js
│   └── User.js
├── server.js
├── package.json
└── README.md
```

## Getting Started

1. **Install dependencies:**
    ```
    npm install
    ```

2. **Set up environment variables:**
    - Create a `.env` file in the `Backend` folder.
    - Add your MongoDB URI and other secrets:
      ```
      PORT=5000
      MONGODB_URI=your_mongodb_connection_string
      ```

3. **Run the server:**
    ```
    npm start
    ```
    Or for development with auto-reload:
    ```
    npm run dev
    ```

## API Endpoints

- `GET /api/status` — Check server status
- `POST /api/auth/...` — User authentication routes
- `POST /api/messages/...` — Messaging routes

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.IO](https://socket.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)

## License

MIT