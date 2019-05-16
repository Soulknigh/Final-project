var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

app.listen(3000, function () {
    console.log("Example is running on port 3000");
});

// Soedinyaem classi
var Grass = require("./Modul/grass.js");
var GrassEater = require("./Modul/grasseater.js");
var Xishnik = require("./Modul/xishnik.js");
var TRex = require("./Modul/trex.js");
var Triceratops = require("./Modul/triceratops.js");

//sozdayom masivi
grassArr = [];
grasseaterArr = [];
xishnikArr = [];
trexArr = [];
triceratopsArr = [];

// Մատրիցի ստեղծում
let w = 100; // Տողերի քանակ
let h = 100; // Սյուների քանակ
function genMatrix(w, h) {
    let matrix = []; 
    for (let y = 0; y < w; y++) {
        matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
        for (let x = 0; x < h; x++) {
            let a = Math.floor(Math.random() * 100);
            if (a >= 0 && a < 20) {
                matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
            }
            if (a >= 20 && a < 40) {
                matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
            }
            else if (a >= 40 && a < 50) {
                matrix[y][x] = 2; // Մատրիցի 10 տոկոսը կլինի 2
            }
            else if (a >= 50 && a < 70) {
                matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
            }
            else if (a >= 70 && a < 90) {
                matrix[y][x] = 4; // Մատրիցի 20 տոկոսը կլինի 4
            }
            else if (a >= 90 && a < 100) {
                matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
            }
        }
    }
    return matrix
}

//Sozdana matrica
matrix = genMatrix(w, h);

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            var ge = new GrassEater(x, y, 2);
            grasseaterArr.push(ge);
        }
        else if (matrix[y][x] == 3) {
            var xs = new Xishnik(x, y, 3);
            xishnikArr.push(xs);
        }
        else if (matrix[y][x] == 4) {
            var tr = new TRex(x, y, 4);
            trexArr.push(tr);
        }
        else if (matrix[y][x] == 5) {
            var as = new Triceratops(x, y, 5);
            triceratopsArr.push(as);
        }
    }
}

function drawserver() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].eat();
    }
    for (var i in trexArr) {
        trexArr[i].eat();
    }
    for (var i in xishnikArr) {
        xishnikArr[i].eat();
    }
    for (var i in triceratopsArr) {
        triceratopsArr[i].eat();
    }
    io.sockets.emit("matrix", matrix);
}

setInterval(drawserver, 3000);

Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.lenght)];
}