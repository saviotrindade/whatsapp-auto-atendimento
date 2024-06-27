const { ProductSize } = require('./enums/ProductSize.js');

class Product {
    #id
    #name;
    _price;
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
        return this._price;
    }

    setPrice(price) {
        this._price = price;
    }
}

class Pizza extends Product {
    #size;
    #quantity;
    #ingredients;

    constructor(id, name, size, quantity, ingredients) {
        super(id, name);
        this.#size = this.setSize(size);
        this._price = this.setPrice();
        this.#quantity = quantity;
        this.#ingredients = ingredients;
    }
    
    getSize() {
        return this.#size;
    }

    setSize(size) {
        switch (size) {
            case "P":
                return ProductSize.SMALL;

            case "M":
                return ProductSize.MEDIUM;

            case "G":
                return ProductSize.LARGE;

            default:
                throw new Error("The selected size is not available.")
        }
    }

    getQuantity() {
        return this.#quantity;
    }

    getIngredients() {
        return this.#ingredients;
    }

    setPrice() {
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

    toString() {
        return `Pizza: sabor ${this.getName()}, tamanho ${this.getSize()}, preço: ${this.getPrice()}, ingredientes: ${this.getIngredients()}`
    }
}

module.exports = { Product, Pizza }