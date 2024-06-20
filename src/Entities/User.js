class User {
    #id;
    #phoneNumber;

    constructor(phoneNumber) {
        this.#id = phoneNumber
        this.#phoneNumber = phoneNumber;
    }

    getPhoneNumber() {
        return this.#id;
    }

    getChannel() {
        return this.#phoneNumber;
    }
}