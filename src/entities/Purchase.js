const { Product } = require('./Product.js')


class Purchase {
    #items;
    #totalPrice;

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
        this.#totalPrice = this.sumItemsPrice();
    }

    getItems() {
        return this.#items;
    }

    getTotalPrice() {
        return this.#totalPrice;
    }

    sumItemsPrice() {
        const initialValue = 0;

        const sum = this.#items.reduce((acc, cur) => {
            return acc + cur.getTotalPrice()
        }, initialValue)

        return parseFloat(sum);
    }

    toString() {
        const itemsToString = this.#items.join("\n")

        return `
        ${itemsToString}
        
        Valor total: *${this.getTotalPrice().toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
            minimumFractionDigits: 2
          })}*`;
    }
}

module.exports = { Purchase }