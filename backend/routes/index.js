const dataRoutes = require("./dataRoutes");

const {mySocket} = require('../sockets');


module.exports = function (router) {
    router.use("/data", dataRoutes());

    return router;
}