const { Step } = require("./Step.js");
const { orders } = require("../../makeOrder.js");
const { OrderStatus } = require("../../entities/enums/OrderStatus.js");

class OrderStatusStep extends Step {
    constructor(user) {
        super("1", "Handling order status", user);
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

            const myOrderStatus = orders.find((order) => {
                if (orderID === order.getID()) {
                    if (this.getUser().getPhoneNumber() === order.getUser().getPhoneNumber()) {
                        return order;
                    }
                }
            }).getStatus();
            if (!myOrderStatus) return sendMessage("Você não possui nenhum pedido registrado com este número.");

            switch (myOrderStatus) {
                case OrderStatus.PENDING: {
                    sendMessage("Seu pedido ainda esta aguardando confirmação.");
                    break;
                }

                case OrderStatus.IN_PRODUCTION: {
                    sendMessage("Seu pedido está em produção.");
                    break;
                }
                
                case OrderStatus.IN_DELIVERY: {
                    sendMessage("Seu pedido está a caminho.");
                    break;
                }

                case OrderStatus.CANCELED: {
                    sendMessage("Seu pedido foi cancelado.");
                    break;
                }

                case OrderStatus.COMPLETED: {
                    sendMessage("Seu pedido já foi entregue.");
                    break;
                }

                default:
                    sendMessage("Não foi possível obter o status do seu pedido. Por favor, tente novamente. Se o problema persistir, entre em contato com um de nossos atendentes.");
                    break;
            }
        } catch(e) {
            sendMessage("Ocorreu um erro inesperado. Por favor, tente novamente. Se o erro persistir, entre em contato com um de nossos atendentes.");
            console.log(e);
        }
        
        this.setIsStepCompleted(true);
    }

    initialMessage() {
        this.getUser().newMessage("Para verificar o status do seu pedido, informe o número do pedido. Se você não se lembrar do número, basta digitar /meuspedidos.");
    }

    getMyOrders() {
        const myOrders = orders.map((order) => {
            if (this.getUser().getPhoneNumber() === order.getUser().getPhoneNumber()) return order;
        })

        return myOrders;
    }
}

module.exports = { OrderStatusStep };