const { orders } = require("./makeOrder.js");
const { Messages } = require("./Messages.js");
const { OrderStatus } = require("./entities/enums/OrderStatus.js");
const { sessions } = require("./Sessions.js");


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
    const prop = parseInt(segmentedMessage[0]);
    segmentedMessage.shift();
    const detail = segmentedMessage.join(" ");


    switch (prefix) {
        case "confirmar": {
            confirmedCommand(msg, prop)
            break;
        }
            
        case "cancelar": {
            cancelledCommand(msg, detail, prop)
            break;
        }

        case "enviar": {
            shippedCommand(msg, prop);
            break;
        }

        case "completar": {
            completedCommand(msg, prop);
            break;
        }

        case "encerrar": {
            sessionClosing(msg, prop)
            break;
        }
    
        default: {
            msg.reply("Nenhum comando encontrado, tente novamente.");
            break;
        }
    }
}

function sessionClosing(msg, sessionID) {
    if (!sessionID) return msg.reply("Para encerrar uma sessão, é necessário fornecer um número de telefone.\n\nExemplo: /encerrar 4899100000")

    try {
        sessions.closeSession(sessionID)
        return msg.reply("Sessão finalizada com sucesso!");

    } catch (e) {
        msg.reply("O número de telefone informado não é válido.");
    }
}

function confirmedCommand(msg, orderID) {
    const order = searchOrder(orderID);

    if (order.getStatus() === OrderStatus.CANCELED) return msg.reply("Não é possivel confirmar este produto, pois ele já está cancelado.");
    if (order.getStatus() !== OrderStatus.PENDING) return msg.reply("Não é possivel confirmar este produto novamente.");

    order.setStatus(OrderStatus.IN_PRODUCTION);
    msg.reply("Status do pedido Nº " + order.getID() + " alterado com sucesso para " + "\"" + OrderStatus.IN_PRODUCTION + "\"");
}

function cancelledCommand(msg, reason, orderID) {
    const order = searchOrder(orderID);
    const orderStatus = order.getStatus();

    if (orderStatus === OrderStatus.IN_DELIVERY) return msg.reply("Não foi possível cancelar este pedido, pois ele já está em rota de entrega.")
    if (orderStatus === OrderStatus.CANCELED) return msg.reply("Não foi possível cancelar este pedido, pois ele já foi cancelado.");

    if (!reason) return msg.reply("Para cancelar um pedido é necessrio informar o motivo!\n\nExemplo: /cancelled 1001 Local de entrega não encontrado.");

    order.setStatus(OrderStatus.CANCELED);

    msg.reply("Status do pedido Nº " + order.getID() + " alterado com sucesso para " + "\"" + OrderStatus.CANCELED + "\"");
    order.getUser().newMessage(Messages.orderCanceled(reason))
}

function shippedCommand(msg, orderID) {
    const order = searchOrder(orderID);
    const orderStatus = order.getStatus();

    if (orderStatus === OrderStatus.IN_DELIVERY) return msg.reply("Não foi possível alterar o status deste pedido para \"enviado\", pois ele já está em rota de entrega.")
    if (orderStatus === OrderStatus.CANCELED) return msg.reply("Não foi possível alterar o status deste pedido para \"enviado\", pois ele já foi cancelado.");

    order.setStatus(OrderStatus.IN_DELIVERY);
    msg.reply("Status do pedido Nº " + order.getID() + " alterado com sucesso para " + "\"" + OrderStatus.IN_DELIVERY + "\"");
    order.getUser().newMessage(Messages.deliveryInProgress());
}

function completedCommand(msg, orderID) {
    const order = searchOrder(orderID);
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