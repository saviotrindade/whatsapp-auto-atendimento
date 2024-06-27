class Address {
    #details;

    constructor(details) {
        this.#details = details;
    }

    getDetails() {
        return this.#details;
    }

    toString() {
        return `${this.#details}`;
    }
}

module.exports = { Address };