const { Messages } = require("../Messages.js");
const { PurchaseStep } = require("./Steps/PurchaseStep.js");
const { OrderStatusStep } = require("./Steps/OrderStatusStep.js");
const { CancelOrderStep } = require("./Steps/CancelOrderStep.js");


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
        
        case "2": {
            const step = new CancelOrderStep(user);
            step.initialMessage();
            return step;
        }
        
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