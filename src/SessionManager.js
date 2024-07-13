const { Messages } = require("./Messages.js");
const { User } = require("./entities/User.js");
const { StepManager } = require("./StepManager");
const { commands } = require("./commands.js");
const { sessions } = require("./Sessions.js");


async function sessionManager(msg) {
    const channel = await msg.getChat();
    const sessionID = channel.id.user;

    if ( msg.body === "cancelar") {
        // closeSession(sessionID);
        sessions.closeSession(sessionID);
    }

    if (sessionID === "120363314584252237") {
        return commands(msg);
    }

    // "IT's ME?"
    if (sessionID !== "557781592441") return;
    
    if (!sessions.getSessionByID(sessionID)) { 
        msg.reply(Messages.welcome());
        sessions.setSession(sessionID);
        sessions.setSessionTimeout(sessionID);
        return;
    }

    if (!sessions.getSessionByID(sessionID).step) {
        const user = new User(sessionID, channel);

        const firstStep = StepManager(msg.body, user);
        sessions.setSessionStep(sessionID, firstStep);
        sessions.setSessionTimeout(sessionID);
        return;
    }

    const shouldExecuteNextStep = sessions.getSessionStep(sessionID).execute(msg.body);
    sessions.setSessionTimeout(sessionID);

    const isStepCompleted = sessions.getSessionStep(sessionID).getIsStepCompleted();
    
    if (isStepCompleted) {
        try {
            sessions.closeSession(sessionID);
        } catch (e) {
            console.log(e);
        }
        return;
    }

    if (!shouldExecuteNextStep) return;

    const nextStep = sessions.getSessionStep(sessionID).getNextStep();
    if (!nextStep) throw new Error("Failed to initiate the next step.");

    sessions.setSessionStep(sessionID, nextStep);

    sessions.getSessionStep(sessionID).initialMessage();
}

module.exports = { sessionManager };