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
        if(test != "Gagné" && test != "Perdu"){
            console.log(test);
            return;
        }
        var obj = {
            table: []
         };
         obj.table.push({joueur: player, result: test, date: moment().format('MMMM Do YYYY, h:mm:ss a')});
         var fs = require('fs');
         fs.writeFile ("IA1.json", JSON.stringify(obj), function(err) {
            if (err) throw err;
            console.log('complete');
        });
        return `{ player: ${player}, result: ${test}`;
    }
)}

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
        if(test != "Gagné" && test != "Perdu"){
            console.log(test);
            return;
        }
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
    await historyJson();
    /*var obj = {
        table: []
    };
    obj.table.push({Player: res.substring(0,res.indexOf('/')), Result:res.substring(res.indexOf('/'))});
    obj.table.push({Player: res2.substring(0,res2.indexOf('/')), Result:res2.substring(res2.indexOf('/'))});
    var json = JSON.stringify(obj);
    var fs = require('fs');
    fs.writeFile('confronts.json', json, 'utf8', callback);*/
}

async function historyJson(){
    var obj = {
        table: []
     };
     var obj2 = {
        table: []
     };
     var fs = require('fs');
    fs.readFile('history.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            fs.readFile('IA1.json', 'utf8', function readFileCallback(err, data2){
                obj2 = JSON.parse(data2);
                var joueur = obj2.table[0].joueur;
                var resultat = obj2.table[0].result;
                if (joueur != "player 1" && joueur != "player 2" && resultat != "Gagné" && resultat != "Perdu"){
                    console.log("Failed  " + joueur);
                    return;
                }
                var date =obj2.table[0].date;
                obj.table.push({joueur: joueur, result: resultat, date: date}); //add some data
                fs.writeFile('history.json', JSON.stringify(obj), function(err) {
                    if (err) throw err;
                    console.log('complete');
                }
                )
            });}
            
    });
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < 5000);
    var obj3 = {
        table: []
     };
     var obj4 = {
        table: []
     };
    fs.readFile('history.json', 'utf8', function readFileCallback(err, data3){
        if (err){
            console.log(err);
        } else {
            obj3 = JSON.parse(data3); //now it an object
            fs.readFile('IA2.json', 'utf8', function readFileCallback(err, data4){
                obj4 = JSON.parse(data4);
                var joueur = obj4.table[0].joueur;
                var resultat = obj4.table[0].result;
                if (joueur != "player 1" && joueur != "player 2" && resultat != "Gagné" && resultat != "Perdu"){
                    console.log("Failed  " + joueur);
                    return;
                }
                var date =obj4.table[0].date;
                obj3.table.push({joueur: joueur, result: resultat, date: date}); //add some data
                fs.writeFile('history.json', JSON.stringify(obj3), function(err) {
                    if (err) throw err;
                    console.log('complete');
                }
                )
            });}
            
    });
}
run();