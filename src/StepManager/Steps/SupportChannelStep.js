const { Step } = require("./Step");

class SupportChannelStep extends Step {
    constructor(user) {
        super("2", "handles the assignment of requests to a human attendant", user);
    }

    execute(message) {
        try {

        } catch(e) {
            console.log(e);
        }
        return;
    }

    initialMessage() {
        return this.getUser().newMessage("👤 *Assistente Virtual:*\n\nVocê está sendo transferido para um de nossos atendentes.");
    }
}

module.exports = { SupportChannelStep }