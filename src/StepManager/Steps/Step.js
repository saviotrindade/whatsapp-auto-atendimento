class Step {
    #stepID;
    #detail;
    #user;
    #nextStep;
    #isStepCompleted;

    constructor(stepID, detail, user, nextStep = null) {
        if (this.constructor === Step) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.#stepID = stepID;
        this.#detail = detail;
        this.#user = user;
        this.#nextStep = nextStep;
        this.#isStepCompleted = false;
    }

    getStepID() {
        return this.#stepID;
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

    setNextStep(nextStep) {
        if (!nextStep) throw new Error("nextStep must be not null.")

        this.#nextStep = nextStep
    }

    execute() {
        throw new Error("Method 'execute()' must be implemented.");
    }

    getInitialMessage() {
        throw new Error("Method 'getStepMessage()' must be implemented.");
    }

    getIsStepCompleted() {
        return this.#isStepCompleted;
    }

    setIsStepCompleted(isCompleted) {
        this.#isStepCompleted = isCompleted;
    }
}

module.exports = { Step };