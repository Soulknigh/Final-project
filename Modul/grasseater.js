var LivingCreature = require("./livingcreature.js");
module.exports =class GrassEater extends LivingCreature  {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 3;
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
        var newCell = Random(this.chooseCell(0));

        if (newCell) {
            this.energy -= 2;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        var grass = Random(this.chooseCell(1));
        if (grass) {
            var newX = grass[0];
            var newY = grass[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy += 2;
            if (this.energy >= 8) {
                this.mul();
                this.energy = 3;
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
            var grassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grasseaterArr.push(grassEater);
            matrix[newCell[1]][newCell[0]] = 2;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;

        for (var i in grasseaterArr) {
            if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                grasseaterArr.splice(i, 1);
            }
        }
    }
}
