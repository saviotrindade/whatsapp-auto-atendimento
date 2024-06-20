class Step {
    #status;
    #detail;

    constructor(status, detail) {
        if (this.constructor === Step) {
            throw new Error("Abstract classes can't be instantiated.")
        }
        this.#status = status;
        this.#detail = detail;
    }

    getStatus() {
        return this.#status;
    }

    getDetail() {
        return this.#detail;
    }

    execute() {
        throw new Error("Method 'execute()' must be implemented.")
    }

    getStepMessage() {
        throw new Error("Method 'getStepMessage()' must be implemented.")
    }
}

module.exports = { Step };