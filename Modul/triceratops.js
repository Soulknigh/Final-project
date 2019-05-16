var LivingCreature = require("./livingcreature.js");
module.exports =class Triceratops extends LivingCreature  {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 7;
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x - 3, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x - 3, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 3, this.y + 3]

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
        var bigCell = newCell.concat(newCell1, newCell2);
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
        var eattrex = Random(this.chooseCell(4));

        if (eattrex) {
            var newX = eattrex[0];
            var newY = eattrex[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            for (var i in trexArr) {
                if (newX == trexArr[i].x && newY == trexArr[i].y) {
                    trexArr.splice(i, 1);
                    break;
                }

            }
            this.x = newX;
            this.y = newY;
        } else {

            this.move();
            if (this.energy <= 0) {
                this.die();
            }

        }

    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in triceratopsArr) {
            if (this.x == triceratopsArr[i].x && this.y == triceratopsArr[i].y) {
                triceratopsArr.splice(i, 1);
            }
        }
    }
}
