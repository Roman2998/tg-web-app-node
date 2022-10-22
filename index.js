const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const constants = require('./constants');
const { botMsgHandler } = require('./botHandlers');
const { appPostHandler } = require('./appHandlers');

const {
    PORT,
    TOKEN,
} = constants;

const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', botMsgHandler);
app.post('/web-data', appPostHandler);

app.listen(PORT, () => console.log('server started on PORT ' + PORT))