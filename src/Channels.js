const GroupChat = require("whatsapp-web.js").GroupChat;


class Channels {
    #service;
    
    getService() {
        return this.#service;
    }
    
    setService(service) {
        if (!service instanceof GroupChat) throw new Error("Channel Type Error: One or more channels are not of type GroupChannel.");
        this.#service = service;
    }
}

const channels = new Channels();

function newChannel(channel) {
    channels.setService(channel);
}

module.exports = { channels, newChannel };