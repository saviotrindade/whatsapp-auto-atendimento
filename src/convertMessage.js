const { Address } = require('./entities/Address.js');
const { productService } = require('./services/productService.js');


// userMessage : "ITEM 01: PIZZA\n- ID: 01\n- NOME: A MODA\n- TAMANHO: G\n- QUANTIDADE: 01"

// ITEM 01: PIZZA
// - ID: 01
// - NOME: A MODA
// - TAMANHO: G
// - QUANTIDADE: 01

function convertMessageToPurchase(message) {
    const itemList = [];

    if (message.includes("\n\n")) {
        message.replaceAll("- ", "").split("\n\n").map((item) => {
            return item.split("\n");
        }).map((item) => {
            return itemList.push(buildProductObject(item));
        })
    } else {
        itemList.push(buildProductObject(message.replaceAll("- ", "").split("\n")));
    }

    itemList.forEach((item) => {
        for (detail in item) {
            if (!item[detail]) throw new Error("It is not possible to build this item.");
        }
    })

    return productService(itemList);
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
                quantity: item[4].split(": ")[1],
            }
        }
        
        default:
            throw new Error("Category not found.");
    }
}

module.exports = { convertMessageToPurchase }