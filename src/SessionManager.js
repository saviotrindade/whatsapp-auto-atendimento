const { Messages } = require('./Messages.js');
const { StepManager } = require('./StepManager');


const sessions = {};

async function sessionManager(msg) {
    const session = await msg.getChat();
    const sessionID = session.id.user;

    

    // console.log('Session: ' + JSON.stringify(session) + '\n' + 'Session ID: ' + JSON.stringify(sessionID))

    if (!sessions[sessionID]) { 
        msg.reply(Messages.welcome());
        setNewSession(session, sessionID);
        sessions[sessionID].timeout = selfDestruct(sessionID);
        return
    }

    // const sessionStep = sessions[sessionID].step;

    if (!sessions[sessionID].step) {
        sessions[sessionID].step = StepManager(session, msg.body);
        sessions[sessionID].timeout = selfDestruct(sessionID);
        return
    }

    sessions[sessionID].step.execute(session, msg.body)? selfDestruct(sessionID, 0) : selfDestruct(sessionID);
}

function setNewSession(session, sessionID) {
    sessions[sessionID] = { 
        session,
        step: null,
        timeout: null
    };
}

function selfDestruct(sessionID, time = 60000) {
    setTimeout(() => {
        delete sessions[sessionID]
    }, time)
}

module.exports = { sessionManager }