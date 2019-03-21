/**
 * Initializes the server at port 4000.
 */
const server = require('./src/server');
server.listen(4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

module.exports = server;