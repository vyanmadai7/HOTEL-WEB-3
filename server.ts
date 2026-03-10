import express from "express";
import { createServer as createViteServer } from "vite";
import rateLimit from "express-rate-limit";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Rate limiter for API requests
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 reservation requests per windowMs
    message: { error: "Too many reservation requests. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // API routes
  app.post("/api/reservation", apiLimiter, (req, res) => {
    const { name, phone, message } = req.body;
    
    // In a real app, you'd save this to a database or send an email
    console.log("New Reservation Request:", { name, phone, message });
    
    res.json({ success: true, message: "Reservation request received! We will call you back shortly." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
