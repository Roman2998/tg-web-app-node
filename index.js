const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = '5641968865:AAFZN32b3Wo2k8NMydxlylUqHl60FSW_Ygc';
const webAppUrl = 'https://cerulean-flan-338d26.netlify.app';
const map = 'https://yandex.ru/maps/-/CCUZFCrXHD';

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start') {
        await bot.sendMessage(chatId, 'Заходи в наш автосервис по кнопке ниже', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Автосервис', web_app: {url: webAppUrl}},
                        {text: 'Карта', url: map}]
                ]
            }
        })
    }
});


app.post('/web-data', async (req, res) => {
    const {queryId, user, products = [], totalPrice, customerName, customerPhoneNumber, customerCar} = req.body;
    console.log(req.body)

    const botOwner = '266833777'

    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: `Оформить заявку`

            }
        })

        await bot.sendMessage(user.id, `${customerName || user.first_name}, поздравляю, вы оформили заявку на сумму от ${totalPrice} рублей, на следующее: ${products.map(item => item.title).join(', ')} ${customerCar ? `для ${customerCar}` : ''}`)
        await bot.sendMessage(botOwner, `${customerName || user.first_name}[ tg://user?id=${user.id} ] тел: [ ${customerPhoneNumber} ] оформил заявку на сумму от ${totalPrice} рублей, ${products.map(item => item.title).join(', ')} ${customerCar ? `для ${customerCar}` : ''}`)

        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})


const PORT = 80;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))