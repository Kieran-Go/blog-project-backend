import 'dotenv/config';
import express from 'express';
import routes from './src/index.js';
import prisma from './db/pool.js';
import errorHandler from './src/middleware/errorHandler.js';
import corsMiddleware from './src/middleware/corsConfig.js';

const app = express();

// Use CORS middleware
app.use(corsMiddleware);

// Middle-ware that enables parsing of raw json into req.body
app.use(express.json());

// Routes
app.use("/auth", routes.auth);
app.use("/users", routes.user);
app.use("/posts", routes.post);
app.use("/comments", routes.comment);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}!`)
);

// Disconnect from DB on app closing
const shutdown = async () => {
  console.log("\nShutting down...");
  try {
    await prisma.$disconnect();
    console.log("Disconnected from database.");
    process.exit(0);
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
};
process.on("SIGINT", shutdown);   // Ctrl+C
process.on("SIGTERM", shutdown);  // kill command