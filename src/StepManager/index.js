const { Messages } = require("../Messages.js");
const { PurchaseStep } = require("./Steps/PurchaseStep.js");
const { OrderStatusStep } = require("./Steps/OrderStatusStep.js");
const { CancelOrderStep } = require("./Steps/CancelOrderStep.js");
const { SupportChannelStep } = require("./Steps/SupportChannelStep.js");


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
            const step = new SupportChannelStep(user);
            step.initialMessage();
            return step;

        default:
            user.newMessage(Messages.notFound());
            return null;
    }
}

module.exports = { StepManager }