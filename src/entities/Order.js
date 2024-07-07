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
        return `*Novo Pedido Recebido:*
        🛒 *Detalhes do Pedido:*\n  ${this.#purchase}
        
        📦 *Detalhes da Entrega:*
           - Endereço de Entrega: ${this.#address.getDetails()}
           - Telefone: ${this.#user.getPhoneNumber()}\n\nPor favor, anote o pedido e confirme o recebimento.`
    }
}

module.exports = { Order };