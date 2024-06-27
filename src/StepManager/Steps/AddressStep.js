const { Step } = require("./Step.js");
const { Messages } = require("../../Messages.js");
const { Address } = require("../../entities/Address.js");


class AddressStep extends Step {
    #purchase;
    #address;

    constructor(user, purchase) {
        super(0.1, "Handling user address.", user)

        this.#purchase = purchase;
        this.#address = null;
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

            this.setIsStepCompleted(true);
            return false;
        } catch(err) {
            console.log("Failed:\n" + err);
            this.getUser().newMessage(Messages.addressError());

            return false;
        }

    }

    getInitialMessage() {
        this.getUser().newMessage(Messages.addressRequest());
    }

    getEndMessage() {

    }

    toString() {
        return `Step ID: ${this.getStepID()}\nDetail: ${this.getDetail()}`;
    }
}

module.exports = { AddressStep }