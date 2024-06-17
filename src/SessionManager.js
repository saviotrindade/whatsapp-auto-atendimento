const sessions = {};

async function sessionManager(msg) {
    const session = await msg.getChat();
    const sessionID = session.id.user;

    // console.log('Session: ' + JSON.stringify(session) + '\n' + 'Session ID: ' + JSON.stringify(sessionID))

    if (!sessions[sessionID]) { 
        msg.reply(welcome());
        setNewSession(session, sessionID);
        sessions[sessionID].timeout = selfDestruct(sessionID);
        return
    }

    msg.reply("Você já está sendo atendido... aguarde!")

}

function setNewSession(session, sessionID) {
    sessions[sessionID] = { 
        session,
        timeout: null
    };
}

function selfDestruct(sessionID) {
    setTimeout(() => {
        delete sessions[sessionID]
    }, 60000)
}

function welcome() {
    return `
    Olá, meu nome é BOT e eu irei atende-lo!
            
    Para começar, diga o que você esta procurando.
    As opções são:
    
    0 - Fazer um pedido.
    1 - Ver o status de um pedido.
    2 - Solicitar o cancelamento de um pedido.
    3 - Falar com um atendente.
    `
}

module.exports = { sessionManager }