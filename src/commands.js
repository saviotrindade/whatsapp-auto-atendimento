const { orders } = require("./makeOrder.js");
const { Messages } = require("./Messages.js");
const { OrderStatus } = require("./entities/enums/OrderStatus.js");
const { channels } = require("./Channels.js");


function commands(msg) {
    try {
        verifyMessage(msg);
        return;
    } catch(e) {
        msg.reply("Não foi possivel executar este comando");
        console.log(e);
    }
}

function verifyMessage(msg) {
    if (!msg.body.includes("/")) return;

    const segmentedMessage = msg.body.replace("/", "").split(" ")

    const prefix = segmentedMessage[0];
    segmentedMessage.shift();
    const orderID = parseInt(segmentedMessage[0]);
    segmentedMessage.shift();
    const reason = segmentedMessage.join(" ");

    const order = searchOrder(orderID);

    switch (prefix) {
        case "confirmed":
            confirmedCommand(msg, order)
            break;

        case "cancelled":
            cancelledCommand(msg, reason, order)
            break;

        case "shipped":
            shippedCommand(msg, order);
            break;
    
        default:
            msg.reply("Nenhum comando encontrado, tente novamente.");
            break;
    }
}

function confirmedCommand(msg, order) {
    const orderStatus = order.getStatus();

    if (orderStatus === OrderStatus.IN_PRODUCTION) return msg.reply("Não foi possível alterar o status deste pedido, pois ele já está em produção.")
    if (orderStatus === OrderStatus.IN_DELIVERY) return msg.reply("Não foi possível alterar o status deste pedido, pois ele já está em rota de entrega.")
    if (order.getStatus() === OrderStatus.CANCELED) return msg.reply("Não foi possível alterar o status deste pedido, pois ele já foi cancelado.");

    order.setStatus(OrderStatus.IN_PRODUCTION);
    msg.reply("Status do pedido Nº " + order.getID() + " alterado com sucesso para " + "\"" + order.getStatus() + "\"");
}

function cancelledCommand(msg, reason, order) {
    const orderStatus = order.getStatus();

    if (orderStatus === OrderStatus.IN_DELIVERY) return msg.reply("Não foi possível alterar o status deste pedido, pois ele já está em rota de entrega.")
    if (order.getStatus() === OrderStatus.CANCELED) return msg.reply("Não foi possível alterar o status deste pedido, pois ele já foi cancelado.");

    if (!reason) return msg.reply("Para cancelar um pedido é necessrio informar o motivo!\n\nExemplo: /cancelled 1001 Local de entrega não encontrado.");

    order.setStatus(OrderStatus.CANCELED);

    msg.reply("Status do pedido Nº " + order.getID() + " alterado com sucesso para " + "\"" + order.getStatus() + "\"");
    order.getUser().newMessage(Messages.orderCanceled(reason))
}

function shippedCommand(msg, order) {
    const orderStatus = order.getStatus();

    if (orderStatus === OrderStatus.IN_DELIVERY) return msg.reply("Não foi possível alterar o status deste pedido, pois ele já está em rota de entrega.")
    if (orderStatus === OrderStatus.CANCELED) return msg.reply("Não foi possível alterar o status deste pedido, pois ele já foi cancelado.");

    order.setStatus(OrderStatus.IN_DELIVERY);
    msg.reply("Status do pedido Nº " + order.getID() + " alterado com sucesso para " + "\"" + order.getStatus() + "\"");
    order.getUser().newMessage(Messages.deliveryInProgress);
}

function searchOrder(orderID) {
    const order = orders.find((item) => {
        if (item.getID() === orderID) return item;
    })

    if (!order) throw new Error("No orders were found matching the provided criteria.");

    return order;
}

module.exports = { commands }