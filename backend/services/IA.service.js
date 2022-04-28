const { exec } = require("child_process");

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
    var test = output.substring(output.indexOf('Final')+8).replace(' ', '').replace('\n','');
    if(parseInt(test)==1 ){
        test =  "Gagné";
    } else {
        test = "Perdu";
    }
    var player = output.substring(output.indexOf('turn')-1, output.indexOf('player')).replace('"', '').replace('-', ' ');
    console.log(test + '/'+player);
});
