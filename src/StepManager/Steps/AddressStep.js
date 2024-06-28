const { Step } = require("./Step.js");
const { Messages } = require("../../Messages.js");
const { Address } = require("../../entities/Address.js");
const { Purchase } = require("../../entities/Purchase.js");
const { OrderStep } = require("./OrderStep.js");


class AddressStep extends Step {
    #purchase;
    #address;

    constructor(user, purchase) {
        if (!purchase instanceof Purchase) throw new Error("Purchase is not instance of Purchase.");
        super("0.1", "Handling user address", user)

        this.#purchase = purchase;
    }

    getPurchase() {
        return this.#purchase;
    }

    getAddress() {
        return this.#address;
    }
    
    setAddress(address) {
        if (this.#address || !(address instanceof Address)) throw new Error("Invalid purchase: this.address must be null and the purchase parameter must be an instance of Address.")

        this.#address = address;
    }

    execute(message) {
        try {
            if (!message) throw new Error("Message must be not null.");
            
            const address = new Address(message);
            this.setAddress(address);

            const nextStep = new OrderStep(this.getUser(), this.#purchase, this.#address);
            this.setNextStep(nextStep);

            return true;
        } catch(err) {
            console.log("Failed in AddressStep:\n" + err);
            this.getUser().newMessage(Messages.addressError());

            return false;
        }

    }

    initialMessage() {
        this.getUser().newMessage(Messages.addressRequest());
    }

    toString() {
        return `Step ID: ${this.getStepID()}\nDetail: ${this.getDetail()}`;
    }
}

module.exports = { AddressStep };