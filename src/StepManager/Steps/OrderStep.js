const { Step } = require("./Step.js");
const { Messages} = require("../../Messages.js");
const { makeOrder } = require("../../makeOrder.js");


class OrderStep extends Step {
    #purchase;
    #address;

    constructor(user, purchase, address) {
        super("0.2", "", user);
        this.#purchase = purchase;
        this.#address = address;
    }

    getPurchase() {
        return this.#purchase;
    }

    getAddress() {
        return this.#address;
    }

    execute(message) {
        switch (message.toLowerCase()) {
            case "sim": {
                try {
                    const orderID = makeOrder(this.getUser(), this.#address, this.#purchase);
                    this.getUser().newMessage(Messages.orderSuccess(orderID));

                    this.setIsStepCompleted(true);
                } catch(err) {
                    console.log("Failed to create order:\n" + err);
                    this.getUser().newMessage(Messages.orderError());
                }
                break;
            }
            
            case "não":
            case "nao":
                this.getUser().newMessage(Messages.orderDeclined());
                this.setIsStepCompleted(true);
                break;
        
            default:
                this.getUser().newMessage(Messages.invalidRequest());
        }
    }

    initialMessage() {

        this.getUser().newMessage((`🛒 *Detalhes do Pedido:*\n ${this.#purchase}\n\n🚨 Por favor, confirme se está correto respondendo com "Sim" ou "Não".`));
    }
}

module.exports = { OrderStep };