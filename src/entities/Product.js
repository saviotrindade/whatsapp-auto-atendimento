const { ProductSize } = require('./enums/ProductSize.js');

class Product {
    #id
    #name;
    #price;
    constructor(id, name) {
        if (this.constructor === Product) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.#id = id;
        this.#name = name;
    }

    getID() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getPrice() {
        return this.#price;
    }

    setPrice(price) {
        this.#price = price;
    }
}

class Pizza extends Product {
    #size;
    #quantity;
    #ingredients;

    constructor(id, name, size, quantity, ingredients) {
        if (!(size === ProductSize.SMALL || size === ProductSize.MEDIUM || size === ProductSize.LARGE)) {
            throw new Error("The selected size is not available.");
        }

        super(id, name);
        this.#size = size;
        this.#quantity = quantity;
        this.#ingredients = ingredients;
    }
    
    getSize() {
        return this.#size;
    }

    getQuantity() {
        return this.#quantity;
    }

    getIngredients() {
        return this.#ingredients;
    }

    productPrice() {
        const price = () => {

            switch (this.#size) {
                case ProductSize.SMALL:
                    return 31.00;
                
                case ProductSize.MEDIUM:
                    return 39.00;
                    
                case ProductSize.LARGE:
                    return 48.00;
                    
                default:
                    throw new Error("Price not found.");
            }
        }

        this.setPrice(price());
    }
}

module.exports = { Product, Pizza }