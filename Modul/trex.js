var LivingCreature = require("./livingcreature.js");
module.exports =class TRex extends LivingCreature  {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 5;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 3, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x + 3, this.y + 3],
            [this.x - 3, this.y + 3]

        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        var newCell = this.chooseCell(0);
        var newCell1 = this.chooseCell(1);
        var newCell2 = this.chooseCell(2);
        var bigCell = newCell.concat(newCell1,newCell2);
        var Cells = Random(bigCell);
    
        if (Cells) {
            var xx = Cells[0]
            var yy = Cells[1]
            var vandak = matrix[yy][xx]

            if (vandak == 0) {
                this.energy -= 2;
                var newX = Cells[0];
                var newY = Cells[1];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                this.x = newX;
                this.y = newY;
            }
            else if (vandak == 1) {
                this.energy -= 2;
                var NewX = Cells[0];
                var NewY = Cells[1];
                matrix[this.y][this.x] = 1;
                var a = new Grass(this.x, this.y, 1);
                grassArr.push(a);
                matrix[NewY][NewX] = this.index;
                this.x = NewX;
                this.y = NewY;
            }
            else if (vandak == 2) {
                this.energy -= 2;
                var NEwX = Cells[0];
                var NEwY = Cells[1];
                matrix[this.y][this.x] = 2;
                var a = new GrassEater(this.x, this.y, 2);
                grasseaterArr.push(a);
                matrix[NEwY][NEwX] = this.index;
                this.x = NEwX;
                this.y = NEwY;
            }
        }
    }
    eat() {
        var eatxishnik = Random(this.chooseCell(3));

        if (eatxishnik) {
            var newX = eatxishnik[0];
            var newY = eatxishnik[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            for (var i in xishnikArr) {
                if (newX == xishnikArr[i].x && newY == xishnikArr[i].y) {
                    xishnikArr.splice(i, 1);
                    break;
                }

            }
            this.x = newX;
            this.y = newY;
            this.energy += 2;
            if (this.energy >= 10) {
                this.mul();
                this.energy = 5;
            }
        } else {

            this.move();
            if (this.energy <= 0) {
                this.die();
            }

        }

    }
    mul() {
        var newCell = Random(this.chooseCell(0));
        if (newCell) {
            var newtrex = new TRex(newCell[0], newCell[1], this.index);
            trexArr.push(newtrex);
            matrix[newCell[1]][newCell[0]] = this.index;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in trexArr) {
            if (this.x == trexArr[i].x && this.y == trexArr[i].y) {
                trexArr.splice(i, 1);
            }
        }
    }
}
