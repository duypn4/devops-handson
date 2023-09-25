const observe = require("./observe/instrument");
const server = require("./server");

observe.initTraceProvider();
server.startServer();