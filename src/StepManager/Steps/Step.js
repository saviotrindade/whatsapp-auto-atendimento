class Step {
    #status;
    #detail;
    #user;
    #nextStep;

    constructor(status, detail, user, nextStep = null) {
        if (this.constructor === Step) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.#user = user;
        this.#status = status;
        this.#detail = detail;
        this.#nextStep = nextStep;
    }

    getStatus() {
        return this.#status;
    }

    getDetail() {
        return this.#detail;
    }

    getUser() {
        return this.#user;
    }

    getNextStep() {
        return this.#nextStep;
    }

    execute() {
        throw new Error("Method 'execute()' must be implemented.");
    }

    getStepMessage() {
        throw new Error("Method 'getStepMessage()' must be implemented.");
    }
}

module.exports = { Step };