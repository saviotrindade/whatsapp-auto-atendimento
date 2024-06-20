class Order {
    #id
    #status
    #address
    #user

    constructor(id, status, address, user) {
        this.#id = id;
        this.#status = status;
        this.#address = address;
        this.#user = user;
    }

    getID() {
        return this.#id;
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