const fs = require('fs');
const path = require('path');
const { Pizza } = require('../entities/Product.js')


function productService(orderList) {
    const data = readFile();

    const productList = [];

    if (!Array.isArray(orderList)) throw new Error("Invalid orderList type: orderList must be an array");
    orderList.forEach((orderItem)  => {
        data.forEach((item) => {
            if (!item["category"] === orderList.category) return;

            item["menu"].find((menu) => {
                if (menu["name"] === orderItem.name) {
                    const product = buildProduct(orderItem.category, orderItem.id, orderItem.name, orderItem.size, orderItem.quantity, menu["ingredients"]);
                    return productList.push(product);
                }
            })

        })
    })

    return productList;
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

function buildProduct(category, id, name, size, quantity, ingredients) {
    switch (category) {
        case "PIZZA":
            return new Pizza(id, name, size, quantity, ingredients);

        default:
            throw new Error("It is not possible to build this item.");
    }
}

module.exports = { productService }