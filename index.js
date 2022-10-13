const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = '5668805313:AAEjoTsoorxXofOejRp6uN8D1aeTYdIz4Z8';
const webAppUrl = 'https://mellifluous-blancmange-dbb48f.netlify.app';

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    // const botOwner = '266833777';
    const text = msg.text;

    if(text === '/start') {
        await bot.sendMessage(chatId, 'Заходи в наш автосревис по кнопке ниже', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }

    // if(msg?.web_app_data?.data) {
    //     try {
    //         const data = JSON.parse(msg?.web_app_data?.data)
    //         console.log(data)
    //         // await bot.sendMessage(chatId, 'Спасибо за обратную связь!')
    //         // await bot.sendMessage(chatId, 'Ваше имя: ' + data?.customerName);
    //         // await bot.sendMessage(chatId, 'ваша машина: ' + data?.customerCar);
    //
    //         // setTimeout(async () => {
    //         //     await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
    //         // }, 3000)
    //
    //
    //         // setTimeout(async () => {
    //         //     await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
    //
    //
    //             // await bot.answerWebAppQuery(botOwner, {
    //             //     id: botOwner,
    //             //     title: 'Успешная покупка',
    //             // })
    //
    //         // }, 3000)
    //
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
});

app.post('/web-data', async (req, res) => {
    const {queryId, products = [], totalPrice /*, customerName, customerCar*/} = req.body;
    //const botOwner = '266833777'
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная заявка',
            input_message_content: {
                // message_text: `${customerName}? поздравляю вас, вы оформили на ремонт ${products.map(item => item.title).join(', ')}, на сумму от ${totalPrice}`
                message_text: `Работает ${products.map(item => item.title).join(', ')}, на сумму от ${totalPrice}`
            }
        })

        // await bot.answerWebAppQuery(botOwner, {
        //     type: 'article',
        //     id: botOwner,
        //     title: 'Успешная заявка',
        //     input_message_content: {
        //         message_text: ` ${customerName}, владелец авто ${customerCar}, оформил заявку на ремонт ремонт ${products.map(item => item.title).join(', ')}, на сумму от ${totalPrice}`
        //     }
        // })

        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))
