const Server = require('./models/servers');
require('dotenv').config();

const server =new Server();
server.execute();