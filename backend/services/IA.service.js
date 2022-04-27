const { exec } = require("child_process");
const path= "../../hackagames/game-risky/";

exec(`python3 ./../../hackagames/game-risky/simplePlayer.py`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    var output = stdout;
    var test = output.substring(output.indexOf('Final'));
    var player = output.substring(output.indexOf('turn')-1, output.indexOf('player'));
    console.log(test);
    console.log(player);
});