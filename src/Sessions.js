class Sessions {
    #sessions

    constructor() {
        this.#sessions = {};
    }

    getSessions() {
        return this.#sessions;
    }

    setSession(sessionID) {
        this.#sessions[sessionID] = {
            step: null,
            timeout: null
        };
    }

    getSessionByID(sessionID) {
        return this.#sessions[sessionID];
    }

    setSessionTimeout(sessionID) {
        if (!this.#sessions[sessionID]) throw new Error("The specified session does not exist.");

        this.#sessions[sessionID].timeout = selfDestruct(sessionID);
    }

    getSessionStep(sessionID) {
        if (!this.#sessions[sessionID]) throw new Error("The specified session does not exist.");

        return this.#sessions[sessionID].step;
    }

    setSessionStep(sessionID, step) {
        if (!this.#sessions[sessionID]) throw new Error("The specified session does not exist.");

        this.#sessions[sessionID].step = step;
    }

    closeSession(sessionID) {
        if (!this.#sessions[sessionID]) throw new Error("The specified session does not exist.");

        delete this.#sessions[sessionID];
    }
}

const sessions = new Sessions();

function selfDestruct(sessionID, timeout = 900000) {
    setTimeout(() => {
        delete sessions[sessionID];
    }, timeout);
}


module.exports = { sessions }