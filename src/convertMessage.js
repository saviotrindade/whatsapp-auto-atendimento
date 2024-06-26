const { User } = require('./entities/User.js');
const { Order } = require('./entities/Order.js');
const { Address } = require('./entities/Address.js');
const { productService } = require('./products/productService.js');


// message : "ITEM 01: PIZZA\n- ID: 01\n- NOME: A MODA\n- TAMANHO: G\n- QUANTIDADE: 01"

function convertMessageToPurchase(message) {
    const itemList = [];
    const orderItems = [];

    if (userMessage.includes("\n\n")) {
        userMessage.replaceAll("- ", "").split("\n\n").map((item) => {
            return item.split("\n");
        }).map((item) => {
            return itemList.push(buildProductObject(item));
        })
    } else {
        itemList.push(buildProductObject(userMessage.replaceAll("- ", "").split("\n")));
    }

    itemList.forEach((item) => {
        for (detail in item) {
            if (!item[detail]) throw new Error("It is not possible to build this item.");
        }
    })

    itemList.forEach((item) => {
        orderItems.push(productService(item));
    })

    return orderItems;
}

function buildProductObject(item) {
    const category = item[0].split(": ")[1];

    switch (category) {
        case "PIZZA": {
            return {
                category: category,
                id: item[1].split(": ")[1],
                name: item[2].split(": ")[1],
                size: item[3].split(": ")[1],
                quantity: item[4].split(": ")[1]
            }
        }
        
        default:
            throw new Error("Category not found.");
    }
}

module.exports = { convertMessageToPurchase }