const {Plugin} = require("powercord/entities");
const {getModule} = require("powercord/webpack");
const test = require("./test");
getModule(["test"], false);
module.exports = class Test extends Plugin {
    startPlugin() {test();}
}
