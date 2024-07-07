const { Messages } = require('./Messages.js');
const { StepManager } = require('./StepManager');
const { User } = require('./entities/User.js');


const sessions = {};

async function sessionManager(msg) {
    const session = await msg.getChat();
    const sessionID = session.id.user;

    if (!sessions[sessionID]) { 
        msg.reply(Messages.welcome());
        setNewSession(sessionID);
        sessions[sessionID].timeout = selfDestruct(sessionID);
        return
    }

    if (!sessions[sessionID].step) {
        const user = new User(sessionID, session);

        sessions[sessionID].step = StepManager(msg.body, user);
        sessions[sessionID].timeout = selfDestruct(sessionID);
        return
    }

    const shouldExecuteNextStep = sessions[sessionID].step.execute(msg.body);
    sessions[sessionID].timeout = selfDestruct(sessionID);

    const isStepCompleted = sessions[sessionID].step.getIsStepCompleted();
    
    if (isStepCompleted) {
        closeSession(sessionID);
        return;
    }

    if (!shouldExecuteNextStep) return;

    const nextStep = sessions[sessionID].step.getNextStep();
    if (!nextStep) throw new Error("Failed to initiate the next step.");

    sessions[sessionID].step = nextStep

    sessions[sessionID].step.initialMessage();
}

function setNewSession(sessionID) {
    sessions[sessionID] = {
        step: null,
        timeout: null
    };
}

function closeSession(sessionID) {
    delete sessions[sessionID];
}

function selfDestruct(sessionID, timeout = 900000) {
    setTimeout(() => {
        delete sessions[sessionID];
    }, timeout)
}

module.exports = { sessionManager }