const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { sessionManager } = require("./SessionManager.js");
const { findGroupChat } = require("./makeOrder.js");


const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false
    }
});

client.on('qr', (qr) =>{
    qrcode.generate(qr, {small: true});
});

let chatOrderRequests;
let appInitializedAt = "";
client.on('ready', async () =>{
    chatOrderRequests = await client.getChatById('120363314584252237@g.us');
    findGroupChat(chatOrderRequests)

    appInitializedAt = Math.floor(Date.now() / 1000);
    console.log('Client is ready!');
});

client.on('message_create', (msg) => {
    if (msg.timestamp < appInitializedAt) return;

    if (msg.body === "init") {
        return sessionManager(msg);
    }

    return;
})

client.on('message', (msg) =>{
    if (msg.timestamp < appInitializedAt) return;

    if (!msg.fromMe) {
        return sessionManager(msg);
    }
});


client.initialize();