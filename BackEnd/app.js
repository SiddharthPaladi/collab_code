import dotenv from "dotenv";
dotenv.config();
import connect from "./db/db.js";
connect();
import express from "express";
import userrouter from "./routes/user.routes.js";
import projectroutes from "./routes/project.routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import chatrouter from "./routes/chat.routes.js"
import aiRoutes from './routes/ai.routes.js'
import ragRoutes from './routes/rag.routes.js'
// import airoutes from "./routes/ai.routes.js"
// import usermodel from "./db/models/user_model.js"
import cors from "cors";
const app = express();

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
]);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  })
);
app.use(cookieParser()); // for parsing cookies
app.use(morgan("dev")); // for logging requests
app.use(express.json()); // for parsing JSON bodies
app.use(express.urlencoded({ extended: true })); // for parsing URL-encoded bodies
// url encoded bodies are used for form submissions read id - 3 
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // no storage of response in cache in the browser  cache control no cache , means it should not be cached and ask the server for the latest response 
  // no-store means it should not store the response in any cache
  // must-revalidate means it should revalidate the response with the server before using it
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("ETag", Math.random().toString()); // Prevents 304 responses
  next();
});



// Main server route
app.get("/", (req, res) => {
  res.send("Collab Code main server running here");
});

// User routes
app.get("/users", (req, res) => {
  res.send(" hey from users route - CollabCode");
});
app.use("/projects", projectroutes);
app.use("/users", userrouter);
app.use("/chats", chatrouter);
app.use("/ai", aiRoutes);
app.use("/rag", ragRoutes);


// app.use("/ai", airoutes);
export default app;
