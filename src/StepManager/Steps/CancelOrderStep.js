const { Step } = require("./Step");
const { orders } = require("../../makeOrder.js");
const { OrderStatus } = require("../../entities/enums/OrderStatus.js");
const { channels } = require("../../Channels");


class CancelOrderStep extends Step {
    constructor(user) {
        super("2", "Handle cancellation of an order", user);
    }
    
    execute(message) {
        const user = this.getUser();
        const sendMessage = (text) => {
            return user.newMessage(text);
        }

        try {
            if (message === "/meuspedidos") {
                const myOrders = this.getMyOrders();

                if (myOrders.length === 0) {
                    sendMessage("Atualmente, você não tem nenhum pedido.");
                    return this.setIsStepCompleted(true)
                }

                const ordersID = myOrders.map((order) => {
                    return `Pedido número: ` + order.getID();
                })

                return sendMessage(
                    `Seus pedidos são os seguintes:\n\n${ordersID.join("\n")}\n\nAgora, por favor, informe o número do pedido que você deseja verificar:`
                )
            }

            const orderID = parseInt(message);
            if (!orderID) return sendMessage("Este não é um número válido! Por favor, tente novamente.");

            const order = orders.find((order) => {
                if (orderID === order.getID()) {
                    if (this.getUser().getPhoneNumber() === order.getUser().getPhoneNumber()) {
                        return order;
                    }
                }
            });
            const myOrderStatus = order.getStatus();
            if (!myOrderStatus) return sendMessage("Você não possui nenhum pedido registrado com este número.");

            if (myOrderStatus !== OrderStatus.PENDING) return sendMessage("Não foi possível cancelar este pedido, pois ele já foi confirmado.")

            order.setStatus(OrderStatus.CANCELED);
            sendMessage("Pedido cancelado com sucesso.");
            channels.getService().sendMessage("O pedido número "+ order.getID() +" foi cancelado pelo cliente.");

        } catch(e) {
            console.log(e);
        }

        this.setIsStepCompleted(true);
    }
    
    initialMessage() {
        this.getUser().newMessage("Para cancelar um pedido, informe o número do pedido. Se você não se lembrar do número, basta digitar /meuspedidos.");
    }

    getMyOrders() {
        const myOrders = orders.map((order) => {
            if (this.getUser().getPhoneNumber() === order.getUser().getPhoneNumber()) return order;
        })

        return myOrders;
    }
}

module.exports = { CancelOrderStep };