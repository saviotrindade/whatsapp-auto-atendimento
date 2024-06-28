const { Step } = require("./Step.js");
const { Messages } = require("../../Messages.js");
const { Purchase } = require("../../entities/Purchase.js");
const { AddressStep } = require("./AddressStep.js")
const { convertMessageToPurchase } = require("../../convertMessage.js")


class PurchaseStep extends Step {
    #purchase

    constructor(user) {
        super("0", "Handling customer order details", user);

        this.#purchase = null;
    }

    getPurchase() {
        return this.#purchase;
    }

    setPurchase(purchase) {
        if (this.#purchase) {
            throw new Error("Purchase already has a value assigned. Cannot set a new value.");
        } else {
            if (!purchase instanceof Purchase) throw new Error("Purchase is not instance of Purchase.");
        }

        this.#purchase = purchase;
    }

    execute(message) {
        try {
            this.setPurchase(convertMessageToPurchase(message));
            console.log()
            const nextStep = new AddressStep(this.getUser(), this.#purchase);
            this.setNextStep(nextStep);

            return true;
        } catch(err) {
            console.log("Failed in PurchaseStep:\n" + err)
            this.getUser().newMessage(Messages.invalidRequest());

            return false;
        }
    }

    initialMessage() {
        this.getUser().newMessage(Messages.orderRequest());
    }

    toString() {
        return `Step ID: ${this.getStepID()}\nDetail: ${this.getDetail()}`;
    }
}

module.exports = { PurchaseStep };