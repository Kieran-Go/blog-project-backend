import 'dotenv/config';
import express from 'express';
import routes from './src/index.js';
import prisma from './db/pool.js';
import errorHandler from './src/middleware/errorHandler.js';

const app = express();

// Middle-ware that enables parsing URL-encoded bodies (such as HTML forms) into req.body
app.use(express.urlencoded({ extended: false }));

// Middle-ware that enables parsing of raw json into req.body
app.use(express.json());

// Routes
app.use("/login", routes.login);
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