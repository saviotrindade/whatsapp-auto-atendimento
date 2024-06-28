const { Order } = require('./entities/Order.js');
const { User } = require('./entities/User.js');
const { Address } = require('./entities/Address.js');
const { Purchase } = require('./entities/Purchase.js');


let nextOrderId = 1001

function generateOrderId() {
    return nextOrderId++;
}

const orders = [];

function makeOrder(user, address, purchase) {
    if (!(user instanceof User && address instanceof Address && purchase instanceof Purchase)) throw new Error("Invalid parameters: one or more parameters are not instances of the expected classes.");

    try {
        const order = new Order(generateOrderId(), user, address, purchase)
        orders.push(order)

        return order.getID();
    }  catch(err) {
        console.log(err)
    }
}

module.exports = { makeOrder }