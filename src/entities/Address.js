class Address {
    #id
    #street
    #landmark
    #order

    constructor(street, landmark, order) {
        this.#id;
        this.#street = street;
        this.#landmark = landmark;
        this.#order = order;
    }

    getStreet() {
        return this.#street;
    }

    getLandmark() {
        return this.#landmark;
    }
    
    getOrder() {
        return this.#order;
    }
}

module.exports = { Address };