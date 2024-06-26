const { Step } = require("./Step.js");
const { Messages } = require("../../Messages.js");
const { Product } = require("../../entities/Product.js");
const { convertMessageToPurchase } = require("../../convertMessage.js")


class InitiateOrder extends Step {
    #purchase

    constructor(user) {
        super(0, "Efetuar um novo pedido.", user);

        this.#purchase = null;
    }

    getPurchase() {
        return this.#purchase;
    }

    setPurchase(purchase) {
        if (!this.#purchase && !(purchase instanceof Product)) throw new Error("Invalid purchase: Purchase must be an instance of Product and must not be null.")

        this.#purchase = purchase;
    }

    execute(message) {
        try {
            this.setPurchase(convertMessageToPurchase(message));

            this.getUser().newMessage("Para continuarmos, preciso que informe o destino para entrega do pedido.");
            
            return true;
        } catch(err) {
            console.log("Failed to create Purchase.\n" + err)
            this.getUser().newMessage(Messages.orderError());

            return false;
        }
    }

    getStepMessage() {
        return this.getUser().newMessage(Messages.orderRequest());
    }

    toString() {
        return `Status: ${this.getStatus()}\nDetail: ${this.getDetail()}`;
    }
}

module.exports = { InitiateOrder };