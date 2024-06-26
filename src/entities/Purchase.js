const { Product } = require('./Product.js')


class Purchase {
    #items
    #totalAmount

    constructor(items) {
        if (Array.isArray(items)) {
            items.forEach((item) => {
                if (!(item instanceof Product)) {
                    throw new Error("Invalid array contents: found a value that is not of type Product.")
                }
            })
        } else {
            throw new Error("Invalid input: expected an array.")
        }

        this.#items = items;
        this.#totalAmount = this.sumItemsPrice();
    }

    getItems() {
        return this.#items;
    }

    getTotalAmount() {
        return this.#totalAmount;
    }

    sumItemsPrice() {
        const sum = 0.0;

        this.#items.forEach((item) => {
            try {
                return sum += parseFloat(item.getPrice());
            } catch(e) {
                throw new Error("Unable to convert the data to a float value.")
            }
        })
        return sum;
    }
}

module.exports = { Purchase }