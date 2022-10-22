const constants = require('./constants');

const {
    BOT_OWNER,
    TITLE_SEPARATOR,
} = constants;

const appPostHandler = async (req, res) => {
    const {
        queryId,
        user,
        products = [],
        totalPrice,
        customerName,
        customerPhoneNumber,
        customerCar
    } = req.body ?? {};

    console.log(req.body)

    const {
        first_name,
        id,
    } = user ?? {};

    const name = customerName || first_name;
    const productTitles = products
        .map(({ title }) => title)
        .join(TITLE_SEPARATOR);
    const customerCarMsg = customerCar
        ?  `для ${customerCar}`
        : '';

    const msgForCustomer = `${name}, поздравляю, вы оформили заявку на сумму от ${totalPrice} рублей, на следующее: ${productTitles} ${customerCarMsg}`;
    const msgForBotOwner = `${name}[ tg://user?id=${id} ] тел: [ ${customerPhoneNumber} ] оформил заявку на сумму от ${totalPrice} рублей, ${productTitles} ${customerCarMsg}`

    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: `Оформить заявку`
            }
        })

        await bot.sendMessage(id, msgForCustomer)
        await bot.sendMessage(BOT_OWNER, msgForBotOwner)

        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
};

module.exports = {
    appPostHandler,
}