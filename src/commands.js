const { orders } = require("./makeOrder.js");
const { Messages } = require("./Messages.js");
const { OrderStatus } = require("./entities/enums/OrderStatus.js");
const { channels } = require("./Channels.js");


function commands(msg) {
    try {
        verifyMessage(msg);
        return;
    } catch(e) {
        msg.reply(e);
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
        case "confirmar":
            confirmedCommand(msg, order)
            break;

        case "cancelar":
            cancelledCommand(msg, reason, order)
            break;

        case "enviar":
            shippedCommand(msg, order);
            break;

        case "encerrar":
            completedCommand(msg, order);
            break;
    
        default:
            msg.reply("Nenhum comando encontrado, tente novamente.");
            break;
    }
}

function confirmedCommand(msg, order) {
    if (order.getStatus() !== OrderStatus.PENDING) return msg.reply("Não é possivel confirmar este produto novamente.");

    order.setStatus(OrderStatus.IN_PRODUCTION);
    msg.reply("Status do pedido Nº " + order.getID() + " alterado com sucesso para " + "\"" + OrderStatus.IN_PRODUCTION + "\"");
}

function cancelledCommand(msg, reason, order) {
    const orderStatus = order.getStatus();

    if (orderStatus === OrderStatus.IN_DELIVERY) return msg.reply("Não foi possível cancelar este pedido, pois ele já está em rota de entrega.")
    if (orderStatus === OrderStatus.CANCELED) return msg.reply("Não foi possível cancelar este pedido, pois ele já foi cancelado.");

    if (!reason) return msg.reply("Para cancelar um pedido é necessrio informar o motivo!\n\nExemplo: /cancelled 1001 Local de entrega não encontrado.");

    order.setStatus(OrderStatus.CANCELED);

    msg.reply("Status do pedido Nº " + order.getID() + " alterado com sucesso para " + "\"" + OrderStatus.CANCELED + "\"");
    order.getUser().newMessage(Messages.orderCanceled(reason))
}

function shippedCommand(msg, order) {
    const orderStatus = order.getStatus();

    if (orderStatus === OrderStatus.IN_DELIVERY) return msg.reply("Não foi possível alterar o status deste pedido para \"enviado\", pois ele já está em rota de entrega.")
    if (orderStatus === OrderStatus.CANCELED) return msg.reply("Não foi possível alterar o status deste pedido para \"enviado\", pois ele já foi cancelado.");

    order.setStatus(OrderStatus.IN_DELIVERY);
    msg.reply("Status do pedido Nº " + order.getID() + " alterado com sucesso para " + "\"" + OrderStatus.IN_DELIVERY + "\"");
    order.getUser().newMessage(Messages.deliveryInProgress());
}

function completedCommand(msg, order) {
    const orderStatus = order.getStatus();

    if (orderStatus !== OrderStatus.IN_DELIVERY) return msg.reply("Não foi possível completar este pedido, pois ele ainda não foi enviado.");

    order.setStatus(OrderStatus.COMPLETED);
    msg.reply("Status do pedido Nº " + order.getID() + " alterado com sucesso para " + "\"" + OrderStatus.COMPLETED + "\"");
}

function searchOrder(orderID) {
    const order = orders.find((item) => {
        if (item.getID() === orderID) return item;
    })

    if (!order) throw new Error("Não foi encontrado nenhum pedido com este ID.");

    return order;
}

module.exports = { commands }