const { v4: uuidv4 } = require('uuid')


class User {
    #id;
    #phoneNumber;
    #channel;

    constructor(phoneNumber, channel) {
        this.#id = uuidv4();
        this.#phoneNumber = phoneNumber;
        this.#channel = channel;
    }

    getID() {
        return this.#id
    }

    getPhoneNumber() {
        return this.#phoneNumber;
    }

    getChannel() {
        return this.#channel;
    }

    newMessage(message) {
        this.#channel.sendMessage(message);
    }
}

module.exports = { User };