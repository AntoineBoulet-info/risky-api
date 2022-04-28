const moment = require('moment')


async function launchGame(){
    const { exec } = require("child_process");

    exec("./../../hackagames/game-risky/hg-risky-hidden", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

async function IA1(){
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
        } else if (parseInt(test)==-1){
            test = "Perdu";
        }
        var player = output.substring(output.indexOf('turn')-1, output.indexOf('player')).replace('"', '').replace('-', ' ');
        var res = player + " => " + test;
        console.log(res);
        var obj = {
            table: []
         };
         obj.table.push({joueur: player, result: test, date: moment().format('MMMM Do YYYY, h:mm:ss a')});
         var fs = require('fs');
         fs.writeFile ("IA1.json", JSON.stringify(obj), function(err) {
            if (err) throw err;
            console.log('complete');
            }
        );
        return `{ player: ${player}, result: ${test}`;
    });
    
}

async function IA2(){
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
        let output = stdout;
        let test = output.substring(output.indexOf('Final')+8).replace(' ', '').replace('\n','');
        if(parseInt(test)==1 ){
            test =  "Gagné";
        } else if (parseInt(test)==-1){
            test = "Perdu";
        }
        let player = output.substring(output.indexOf('turn')-1, output.indexOf('player')).replace('"', '').replace('-', ' ');
        var res = player + " => " + test;
        console.log(res);
        var obj = {
            table: []
         };
         obj.table.push({joueur: player, result: test, date: moment().format('MMMM Do YYYY, h:mm:ss a')});
         var fs = require('fs');
         fs.writeFile ("IA2.json", JSON.stringify(obj), function(err) {
            if (err) throw err;
            console.log('complete');
            }
        );
        return res;
    });
}

async function run(){
    await launchGame();
    await IA1();
    await IA2();
    /*var obj = {
        table: []
    };
    obj.table.push({Player: res.substring(0,res.indexOf('/')), Result:res.substring(res.indexOf('/'))});
    obj.table.push({Player: res2.substring(0,res2.indexOf('/')), Result:res2.substring(res2.indexOf('/'))});
    var json = JSON.stringify(obj);
    var fs = require('fs');
    fs.writeFile('confronts.json', json, 'utf8', callback);*/
}

run();