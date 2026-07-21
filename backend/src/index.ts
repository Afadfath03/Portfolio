import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.js";
import { contentRouter } from "./routes/content.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/content", contentRouter);

const PORT = parseInt(process.env.PORT || "8889", 10);
app.listen(PORT, () => {
  console.log(`Backend API running on :${PORT}`);
});
