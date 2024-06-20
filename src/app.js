const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { sessionManager } = require('./SessionManager.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false
    }
});

client.on('qr', (qr) =>{
    qrcode.generate(qr, {small: true});
});

let appInitializedAt = "";
client.on('ready', () =>{
    appInitializedAt = Math.floor(Date.now() / 1000);
    console.log('Client is ready!');
});

client.on('message_create', (msg) => {
    if (msg.body === "init") {
        return sessionManager(msg);
    }
})

client.on('message', (msg) =>{
    if (msg.timestamp < appInitializedAt) return

    if (!msg.fromMe) {
        return sessionManager(msg);
    }
});



client.initialize();