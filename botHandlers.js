const constants = require('./constants');

const {
    WEB_APP_URL,
    MAP_URL,
} = constants;

const botMsgHandler = async ({ text, chat } = {}) => {
    const { id } = chat;

    if(text === '/start') {
        await bot.sendMessage(id, 'Заходи в наш автосервис по кнопке ниже', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Автосервис', web_app: { url: WEB_APP_URL } },
                        { text: 'Карта', url: MAP_URL }
                    ]
                ]
            }
        })
    }
};

module.exports = {
    botMsgHandler,
}