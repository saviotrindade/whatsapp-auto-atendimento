const { Step } = require("./Step.js");
const { Messages } = require("../../Messages.js");
const { Product } = require("../../entities/Product.js");
const { AddressStep } = require("./AddressStep.js")
const { convertMessageToPurchase } = require("../../convertMessage.js")


class PurchaseStep extends Step {
    #purchase

    constructor(user) {
        super(0, "Handling customer order details.", user);

        this.#purchase = null;
    }

    getPurchase() {
        return this.#purchase;
    }

    setPurchase(purchase) {
        if (this.#purchase) {
            throw new Error("Purchase already has a value assigned. Cannot set a new value.")

        } else {
            if (!Array.isArray(purchase)) throw new Error("Invalid purchase type: purchase must be an array")
            purchase.forEach((product) => {
                if (!(product instanceof Product)) throw new Error("Invalid purchase: One or more items in purchase are not instances of Product.")
            })
        }

        this.#purchase = purchase;
    }

    execute(message) {
        try {
            this.setPurchase(convertMessageToPurchase(message));
    
            const nextStep = new AddressStep(this.getUser(), this.#purchase);
            this.setNextStep(nextStep);

            return true;
        } catch(err) {
            console.log("Failed to create Purchase:\n" + err)
            this.getUser().newMessage(Messages.orderError());

            return false;
        }
    }

    getInitialMessage() {
        this.getUser().newMessage(Messages.orderRequest());
    }

    toString() {
        return `Step ID: ${this.getStepID()}\nDetail: ${this.getDetail()}`;
    }
}

module.exports = { PurchaseStep };