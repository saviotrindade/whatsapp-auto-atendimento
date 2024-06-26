const fs = require('fs');
const path = require('path');
const { Pizza } = require('../entities/Product.js')


function productService(orderList) {
    const data = readFile();

    const productList = [];

    productList.push(orderList.forEach((orderItem)  => {
        data.forEach((item) => {
            if (!item["category"] === orderList.category) return;

            const product = item["menu"].find((menu) => {
                if (menu["name"] === orderItem.name) {
                    return buildProduct(orderItem.category, orderItem.name, orderItem.size, orderItem.quantity, menu["ingredients"]);
                }
            })
            console.log(product)
            if (!product) throw new Error("Product not found.");

            return product
        })
    }))

}

function readFile() {
    const jsonFilePath = path.join(__dirname, "products.json");

    const data = fs.readFileSync(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
            throw new Error("Error reading the file:", err);
        }

        try {
            return data;
        } catch (parseErr) {
            throw new Error("Error parsing JSON", parseErr);
        }
    })

    return JSON.parse(data);
}

function buildProduct(category, name, size, quantity, ingredients) {
    switch (category) {
        case "PIZZA":
            return new Pizza(name, size, quantity, ingredients)
    
        default:
            throw new Error("It is not possible to build this item.");
    }
}

module.exports = { productService }