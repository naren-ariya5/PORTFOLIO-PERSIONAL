const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = 'messages.json';

// Save message
app.post('/api/messages', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const newMsg = { name, email, phone, subject, message, date: new Date() };
  let messages = [];
  if (fs.existsSync(DATA_FILE)) {
    messages = JSON.parse(fs.readFileSync(DATA_FILE));
  }
  messages.push(newMsg);
  fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
  res.json({ success: true });
});

// Get all messages (admin)
app.get('/api/messages', (req, res) => {
  if (!fs.existsSync(DATA_FILE)) return res.json([]);
  const messages = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(messages);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));