import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") dotenv.config();

import express from "express";
import http from "http";
import { initSocket } from "./websocket/socket";
import { router } from "./routes/index";
import { fetchLogs } from "./lib/loki";
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use("/api", router);

app.get("/health", (_req, res) => res.json({ ok: true }));


// // 🔹 Test Loki logs
// app.post("/test/loki", async (req, res) => {
//   const limit = req.body.limit || 1000;

//   console.log("🧪 [TEST] Loki fetch started...");

//   try {
//     const logs = await fetchLogs(limit);

//     console.log(`✅ [TEST] Loki success | Logs: ${logs.length}`);

//     res.json({
//       success: true,
//       count: logs.length,
//       sample: logs.slice(0, 10), // only return first 10 logs
//     });

//   } catch (err: any) {
//     console.error("❌ [TEST] Loki failed:", err.message);

//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// });

initSocket(server);

const PORT = process.env.PORT ?? 3000;
server.listen(PORT, () => console.log(`DefendX listening on :${PORT}`));