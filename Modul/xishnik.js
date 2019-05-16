var LivingCreature = require("./livingcreature.js");
module.exports =class Xishnik extends LivingCreature  {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]

        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        var newCell = this.chooseCell(0);
        var newCell1 = this.chooseCell(1);
        var bigCell = newCell.concat(newCell1);
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
        }
    }
    eat() {
        var grasseaterr = Random(this.chooseCell(2));
        if (grasseaterr) {
            var newX = grasseaterr[0];
            var newY = grasseaterr[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;
            for (var i in grasseaterArr) {
                if (newX == grasseaterArr[i].x && newY == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }

            }
            this.x = newX;
            this.y = newY;
            this.energy += 2;
            if (this.energy >= 9) {
                this.mul();
                this.energy = 8;
            }
        }
        else {

            this.move();
            if (this.energy <= 0) {
                this.die();
            }

        }

    }
    mul() {
        var newCell = Random(this.chooseCell(0));
        if (newCell) {
            var newxishnik = new Xishnik(newCell[0], newCell[1], this.index);
            xishnikArr.push(newxishnik);
            matrix[newCell[1]][newCell[0]] = this.index;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in xishnikArr) {
            if (this.x == xishnikArr[i].x && this.y == xishnikArr[i].y) {
                xishnikArr.splice(i, 1);
            }
        }
    }
}
