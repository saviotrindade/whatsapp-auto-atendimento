const { Step } = require('./Step.js')
const { Messages } = require('../../Messages.js')


class OrderDetails extends Step {
    constructor() {
        super(0, "Efetuar um novo pedido.");
    }

    execute(chat, message) {
        if (message === "2000") {
            chat.sendMessage(Messages.orderSuccess());
            return true;
        }

        chat.sendMessage(Messages.orderError());
        return false;
    }

    getStepMessage() {
        return Messages.orderRequest();
    }

    toString() {
        return `Status: ${this.getStatus()}\nDetail: ${this.getDetail()}`;
    }
}

module.exports = { OrderDetails };