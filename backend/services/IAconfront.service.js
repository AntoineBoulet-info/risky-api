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
        traitement(stdout);
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
        return traitement(stdout);
    });
}

async function traitement(string){
    var output = string;
        var test = output.substring(output.indexOf('Final')+8).replace(' ', '').replace('\n','');
        if(parseInt(test)==1 ){
            test =  "Gagné";
        } else if (parseInt(test)==-1){
            test = "Perdu";
        }
        var player = output.substring(output.indexOf('turn')-1, output.indexOf('player')).replace('"', '').replace('-', ' ');
        return test + '/' + player;
}

async function showData(res1, res2){
    console.log(res1,res2);
}

async function run(){
    let res= await IA1();
    let res2 = await IA2();
    showData(res,res2);
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