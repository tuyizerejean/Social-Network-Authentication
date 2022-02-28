require('dotenv').config();

const server = require('./src/index.js');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
