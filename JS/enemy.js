function getRandForNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function createEnemy(w, h, imgURL, canvas) {
    var enemy = new Enemy(w, h, imgURL, canvas);

    return enemy;
}

function Enemy(w, h, imgURL, canvas) {
    var canvasWidth = canvas.width;
    var x = getRandForNum(0, canvasWidth - w);
    this.x = x;
    this.y = -h;
    this.w = w;
    this.h = h;

    this.speed = getRandForNum(3, 10);

    this.image = new Image();
    this.image.src = imgURL;
}

Enemy.prototype.draw = function(canvas) {
    var context = canvas.getContext('2d');
    context.drawImage(this.image, 0, 0, this.w, this.h, this.x, this.y, this.w, this.h);
}

Enemy.prototype.move = function() {
    this.y += this.speed;
}

Enemy.prototype.isOutOfScreen = function(canvas) {
    if (this.y > canvas.height) {
        return true;
    } else {
        return false;
    }
}

Enemy.prototype.crash = function() { //敌机击落音效
    /* var endSound = new Audio('音乐路径');
    endSound.play(); */
}

//碰撞检测
/* 
因为我们不知道obj1和obj2的位置，所以要获取它们的坐标值和坐标加上宽度的值，通过取得它们之间的最大最小值，
来判断这两个对象的其中一个的宽度是否与另一个的坐标重叠或者是少于宽度，当x与y都满足少于的时候就是相撞
*/
function isEnemyHitHero(obj1, obj2) {
    var minX1 = obj1.x;
    var minY1 = obj1.y;
    var maxX1 = obj1.x + obj1.w;
    var maxY1 = obj1.y + obj1.h;

    var minX2 = obj2.x;
    var minY2 = obj2.y;
    var maxX2 = obj2.x + obj2.w;
    var maxY2 = obj2.y + obj2.h;

    var minX = Math.max(minX1, minX2);
    var minY = Math.max(minY1, minY2);
    var maxX = Math.min(maxX1, maxX2);
    var maxY = Math.min(maxY1, maxY2);

    if (minX < maxX && minY < maxY) {
        return true;
    } else {
        return false;
    };
};