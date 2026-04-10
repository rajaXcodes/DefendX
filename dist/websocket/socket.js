import { WebSocketServer, WebSocket } from "ws";
let wss;
export const initSocket = (server) => {
    wss = new WebSocketServer({ server });
    wss.on("connection", (ws) => {
        console.log("[WS] client connected");
    });
};
export const emitState = (jobId, state, payload) => {
    if (!wss)
        return;
    const msg = JSON.stringify({ jobId, state, payload, timestamp: Date.now() });
    console.log("📡 EMITTING:", msg); // 👈 ADD THIS
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN)
            client.send(msg);
    });
};
