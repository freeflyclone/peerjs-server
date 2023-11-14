const fs = require("fs");
const { PeerServer } = require("peer");

var nextClientID = 0;

if (process.argv.length != 5) {
    console.log("Usage: node peer_srvr.cjs port# ssl-cert-file ssl-key-file");
    process.exit(9);
}

const peerServerConfig = {
    port: process.argv[2], 
    ssl: {
        cert: fs.readFileSync(process.argv[3]),
        key: fs.readFileSync(process.argv[4]),
    },
	allow_discovery: true,
    generateClientId: GenerateClientID,
};

const peerServer = PeerServer(peerServerConfig);

peerServer.on('connection', (client) => {
    console.log("peerServer.on(connection) ID: ", client.getId());
});

peerServer.on('disconnect', (client) => {
    console.log("peerServer.on(disconnect), ID: ", client.getId());
});

function GenerateClientID() {
    var retVal = nextClientID++;
    return retVal.toString(10);
}