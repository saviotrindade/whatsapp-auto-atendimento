const { Messages } = require("./Messages.js")


function StepManager(chat, message) {
    switch (message) {
        case "0":
            const newStep = new Step0();
            chat.sendMessage(newStep.toString());
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


class Step0 {
    #status;
    #detail;

    constructor() {
        this.#status = 0,
        this.#detail = "Efetuar um novo pedido."
    }

    getStatus() {
        return this.#status;
    }

    getDetail() {
        return this.#detail;
    }

    execute(chat, message) {
        if (message === "2000") {
            chat.sendMessage(Messages.orderSuccess());
            return true;
        }

        chat.sendMessage(Messages.orderError());
        return false;
    }

    toString() {
        return "Faça seu pedido pelo nosso cardapio online!\nAcesse: https://www.google.com";
    } 
}

module.exports = { StepManager }