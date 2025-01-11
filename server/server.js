const express = require('express');
const dotenv = require('dotenv');
const { StreamClient } = require("@stream-io/node-sdk");
const cors = require('cors');
const path = require("path");
const enforce = require("express-sslify");


dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

const { STREAM_API_KEY, STREAM_API_SECRET } = process.env;
if (!STREAM_API_KEY || !STREAM_API_SECRET) {
  console.error('Please set STREAM_API_KEY and STREAM_API_SECRET in your .env file.');
  process.exit(1);
}


const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.post('/generate-token', (req, res) => {
  const { userId } = req.body;
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.floor(Date.now() / 1000) - 60;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const token = streamClient.generateUserToken({ user_id: userId, validity_in_seconds: exp, issued: issued});
    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
