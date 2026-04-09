# 🚀 DefendX

**DefendX** is an automated security analysis and remediation engine that ingests logs, detects threats using AI, and takes real-time corrective actions — all with live progress tracking via WebSockets.

---

## 🧠 What it does

* 📥 Fetches logs from multiple domains (`http`, `infra`, `auth`)
* 🤖 Runs AI-powered threat analysis
* 🚨 Detects issues like:

  * Brute force attacks
  * Port scans
  * Resource exhaustion
* 🛠 Automatically triggers remediation:

  * Block IPs
  * Apply rate limits
  * Alert SOC teams
* 📊 Stores findings, actions, and reports
* 📡 Streams real-time job updates via WebSockets
* 📢 Sends notifications (Slack, Jira, Email)

---

## 🏗 Architecture Overview

```
Client → API → Job Runner → AI Analysis
                      ↓
                Prisma (DB)
                      ↓
         WebSocket (Real-time updates)
                      ↓
       Slack / Jira / Email Notifications
```

---

## ⚙️ Tech Stack

* **Backend:** Node.js, Express
* **Database:** PostgreSQL (via Prisma ORM)
* **Realtime:** WebSockets (`ws`)
* **AI:** OpenRouter / LLM integration
* **Other:** Loki (logs), Nodemailer, Axios

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/rajaXcodes/DefendX.git
cd defendx
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file:

Or manually:

```env
PORT=3000

DB_URL=

LOKI_URL=
LOKI_USERNAME=
LOKI_PASSWORD=

NODE_ENV = 'development'

OPENROUTER_API_KEY=

```

---

### 4. Setup database (Prisma)

```bash
npx prisma generate
npx prisma db push
```

---

### 5. Run the server

```bash
npm run dev
```

Server starts on:

```
http://localhost:3000
```

---

## 🚀 Usage

### Trigger a Job

```bash
curl -X POST http://localhost:3000/api/jobs/trigger \
  -H "Content-Type: application/json" \
  -d '{"windowMinutes": 10}'
```

Response:

```json
{
  "message": "Job triggered"
}
```

---

## 📡 WebSocket (Real-time Updates)

DefendX streams job progress in real-time.

### Connect using a simple client:

```js
const ws = new WebSocket("ws://localhost:3000");

ws.onopen = () => {
  console.log("Connected");
};

ws.onmessage = (event) => {
  console.log("Update:", JSON.parse(event.data));
};
```

### Example event:

```json
{
  "jobId": "uuid",
  "state": "ANALYZING",
  "payload": {
    "totalLogs": 1200
  },
  "timestamp": 1710000000000
}
```

---

## 🔄 Job Lifecycle

1. **FETCHING** → Logs collected
2. **ANALYZING** → AI processes logs
3. **REMEDIATING** → Actions executed
4. **COMPLETED** → Job finished
5. **ERROR** → Failure occurred

---

## 🛠 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Compile TypeScript
npm start          # Run production build
```

---

## 📁 Project Structure

```
.
├── websocket/       # WebSocket server
├── jobs/            # Job runner logic
├── routes/          # Express routes
├── lib/             # DB and utilities
├── prisma/          # Prisma schema
├── generated/       # Prisma enums/types
```

---

## 🧪 Testing

### 1. Start server

```bash
npm run dev
```

### 2. Start WebSocket client

```bash
node test-ws.js
```

### 3. Trigger job

```bash
curl -X POST http://localhost:3000/api/jobs/trigger \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch
3. Make changes
4. Submit a PR


## ⚠️ Notes

* `.env` is required (not committed)
* Ensure database is running before starting
* WebSocket clients must connect **before triggering jobs** to receive all events

---

## 🚀 Future Improvements

* Per-job WebSocket subscriptions
* Dashboard UI (React)
* Retry & failure recovery system
* Advanced anomaly detection
* Role-based access control

---

## 📜 License

MIT

---

## 💡 Author

Built with ⚡ by you — scaling toward a real-time SOC automation platform.
