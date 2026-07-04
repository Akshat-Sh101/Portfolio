import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import contactRoute from "./routes/contact_route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" })); 

app.use("/api/contact", contactRoute);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT}`);
});