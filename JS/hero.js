function createHero(width, height, canvas, imgURL, completeCallback) {
    //var ctx = canvas.getContext('2d');
    var timer;

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var x = canvasWidth / 2 - width / 2; //飞机水平居中
    var y = canvasHeight - height - 20; //飞机垂直底部向上20像素

    var hero = new Hero(x, y, width, height, imgURL, completeCallback);

    document.onkeydown = function(event) {
        var event = event || window.event;

        switch (event.keyCode) {
            case 37:
                { hero.left = true; break; }
            case 38:
                { hero.up = true; break; }
            case 39:
                { hero.right = true; break; }
            case 40:
                { hero.down = true; break; }
        }
    }

    document.onkeyup = function(event) {
        var event = event || window.event;

        switch (event.keyCode) {
            case 37:
                { hero.left = false; break; }
            case 38:
                { hero.up = false; break; }
            case 39:
                { hero.right = false; break; }
            case 40:
                { hero.down = false; break; }
        }
    }

    timer = setInterval(() => {
        if (hero.left == true) hero.x -= 1;
        if (hero.up == true) hero.y -= 1;
        if (hero.right == true) hero.x += 1;
        if (hero.down == true) hero.y += 1;
    }, 1);

    return hero;
}

function Hero(x, y, w, h, imgURL, completeCallback) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.image = new Image();
    //加载图片
    this.image.onload = function() {
        if (completeCallback) {
            completeCallback(this);
        }
    }

    //添加图片源
    this.image.src = imgURL;

    //图片开关
    this.bool = true;
}

Hero.prototype.draw = function(canvas) {
    var ctx = canvas.getContext('2d');
    var x = this.w * this.bool;
    var w = this.w;
    var h = this.h;
    ctx.drawImage(this.image, x, 0, w, h, this.x, this.y, w, h);

    this.bool = !this.bool; //取反
}