const { ProductSize } = require('./enums/ProductSize.js');

class Product {
    #id
    #name;
    #category;
    #quantity;
    #unitPrice;
    #totalPrice;
    constructor(id, name, category, quantity) {
        if (quantity <= 0) throw new Error("Quantity must be greater than zero.");
        if (this.constructor === Product) throw new Error("Abstract classes can't be instantiated.");
        
        this.#id = id;
        this.#name = name;
        this.#category = category;
        this.#quantity = quantity;
    }

    getID() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getCategory() {
        return this.#category;
    }

    getQuantity() {
        return this.#quantity;
    }

    getUnitPrice() {
        return this.#unitPrice;
    }

    setUnitPrice(price) {
        this.#unitPrice = price;
    }

    getTotalPrice() {
        return this.#totalPrice;
    }

    setTotalPrice(price) {
        this.#totalPrice = price;
    }

    toString() {
        throw new Error("Method 'toString()' must be implemented.");
    }
}

class Pizza extends Product {
    #size;
    #ingredients;

    constructor(id, name, size, category, quantity, ingredients) {
        super(id, name, category, quantity);
        this.#size = this.setSize(size);
        this.#ingredients = ingredients;

        this.calculateUnitPrice();
        this.calculateTotalPrice();
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

    getIngredients() {
        return this.#ingredients;
    }

    calculateUnitPrice() {
        if (!this.#size) throw new Error("Size must be defined before setting the price.");

        const price = () => {
            switch (this.#size) {
                case ProductSize.SMALL:
                    return 31.00;
                
                case ProductSize.MEDIUM:
                    return 39.00;
                    
                case ProductSize.LARGE:
                    return 48.10;
                    
                default:
                    throw new Error("Price not found.");
            }
        }

        this.setUnitPrice(parseFloat(price().toFixed(2)));
    }

    calculateTotalPrice() {
        if (!this.getUnitPrice() || !this.getQuantity()) throw new Error("");

        const price = () => {
            return this.getUnitPrice() * this.getQuantity();
        }

        this.setTotalPrice(parseFloat(price().toFixed(2)))
    }

    toString() {
        return `Pizza: ${this.getName()}, ${this.getSize()}, ${this.getQuantity()}uni, ${this.getTotalPrice().toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
            minimumFractionDigits: 2
          })}`;
    }
}

module.exports = { Product, Pizza }