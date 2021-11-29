const {exec, execSync} = require("child_process");

// const fs = require("fs");
//discord.js/src/client/actions/
const options = {
    "dependencies": {
        "discord.js": "^13.3.1",
        "dotenv": "^10.0.0",
        // "mysql2": "^2.3.3-rc.0",
        "sequelize": "^6.9.0",
        "sequelize-auto": "^0.8.5",
        "sequelize-cli": "^6.3.0"
    },
    "devDependencies": {
        "jsdoc": "^3.6.7",
        "link-module-alias": "^1.2.0"
    },
    "scripts": {
      "postinstall": "link-module-alias",
      "doc": "jsdoc -c jsdoc.json"
    },
}


const [,,bot_name] = process.argv;

// const command = new Map();
// const commandFolders = fs.readdirSync("").filter(file => file.endsWith('.js'));
execSync(`npm init -y -w ${bot_name || "discord_comment_bot"}`)