const { OrderStatus } = require('./enums/OrderStatus.js');


class Order {
    #id
    #purchase
    #status
    #address
    #user

    constructor(id, user, address, purchase) {
        this.#id = id;
        this.#status = OrderStatus.PENDING;
        this.#user = user;
        this.#address = address;
        this.#purchase = purchase;
    }

    getID() {
        return this.#id;
    }

    getProduct() {
        return this.#purchase;
    }

    getStatus() {
        return this.#status;
    }

    getAddress() {
        return this.#address;
    }

    getUser() {
        return this.#user;
    }

    toString() {
        return "Aqui estão os detalhes do seu pedido:\n\nID do Produto:" + this.getID() + "\nStatus: " + this.getStatus() + "\n\nAgradecemos sua paciência. Caso precise de mais informações, estamos à disposição!"
    }
}

module.exports = { Order };