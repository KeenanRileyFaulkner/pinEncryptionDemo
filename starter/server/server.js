const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const msgCtrl = require('./messageController');

app.post('/api/messages', msgCtrl.createMessage);

app.listen(4004, () => console.log("Listening on port 4004"));