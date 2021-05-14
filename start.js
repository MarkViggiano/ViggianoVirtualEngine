const { spawn } = require("child_process");

const npmServer = spawn("node", ["node/scripts/index.js"]);

npmServer.stdout.on("data", data => {
    console.log(`[NPM Server]: ${data}`);
});

npmServer.stderr.on("data", data => {
    console.log(`[NPM Server Error]: ${data}`);
});

npmServer.on('error', (error) => {
    console.log(`[Error]: ${error.message}`);
});

npmServer.on("close", code => {
    console.log(`child process exited with code ${code}`);
});
