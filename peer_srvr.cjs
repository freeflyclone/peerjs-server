const fs = require("fs");
const { PeerServer } = require("peer");

var nextClientID = 0;

// the ssl key/cert need changing depending on hostname.
// TODO: figure out how to do so programmatically
const peerServerConfig = {
    port: 4447, 
    ssl: {
       key: fs.readFileSync("../../certs/localhost.key"),
       cert: fs.readFileSync("../../certs/localhost.crt"),
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