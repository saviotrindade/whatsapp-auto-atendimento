const { Messages } = require("../Messages.js");
const { PurchaseStep } = require("./Steps/PurchaseStep.js");
const { OrderStatusStep } = require("./Steps/OrderStatusStep.js");


function StepManager(message, user) {
    switch (message) {
        case "0": {
            const step = new PurchaseStep(user);
            step.initialMessage();
            return step;
        }
    
        case "1": {
            const step = new OrderStatusStep(user);
            step.initialMessage();
            return step;
        }
        
        case "2":
            return `
            Qual o numero do seu pedido?
            `;
        
        case "3": 
            return `
            Estou lhe encaminhando para um de nossos atendentes, aguarde...
            `;

        default:
            user.newMessage(Messages.notFound());
            return null;
    }
}

module.exports = { StepManager }