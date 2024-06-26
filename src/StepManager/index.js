const { Messages } = require("../Messages.js");
const { InitiateOrder } = require("./Steps/InitiateOrder.js");


function StepManager(message, user) {
    switch (message) {
        case "0":
            const newStep = new InitiateOrder(user);
            newStep.getStepMessage();
            return newStep;
    
        case "1": 
            return `
            Qual o numero do seu pedido?
            `;
        
        case "2":
            return `
            Qual o numero do seu pedido?
            `;
        
        case "3": 
            return `
            Estou lhe encaminhando para um de nossos atendentes, aguarde...
            `;

        default:
            chat.sendMessage(Messages.notFound());
            return null;
    }
}

module.exports = { StepManager }