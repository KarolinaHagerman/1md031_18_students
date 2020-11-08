
// (string, int, bool, bool)
function MenuItem(nm, kcal, glut, lact) {
    this.name = nm;
    this.calories = kcal;
    this.gluten = glut;
    this.lactose = lact;
    this.burger = function() {
        return this.name + ': ' + this.calories + 'kCal';
    };
}

let burger1 = new MenuItem('Basic Burger', 800, true, true);
console.dir(burger1);
console.log(burger1.name);
