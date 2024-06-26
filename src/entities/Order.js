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
}

module.exports = { Order };