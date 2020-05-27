let scoreLeft = 0;
let scoreRight = 0;

let ball = {
    x: 0,
    y: 0,
    speedX: 10,
    speedY: 0,
    radius: 40
}

let paddleLeft
// = {
//     x: 30,
//     y: 0,
//     width: 20,
//     height: 150
// }

let paddleRight
// = {
//     x: 0,
//     y: 0,
//     width: 20,
//     height: 150
// }


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    rectMode(CENTER);
    noStroke();
    paddleLeft = new PaddleLeft(30, 0, 20, 150);
    paddleRight = new PaddleRight(0, 0, 20, 150);



    ball.x = width / 2;
    ball.y = height / 2;

    paddleRight.x = width - 30;
}

function draw() {
    background(0);
    fill(255);
    moveBall();
    bounceBall();
    drawElements();
    paddleLeft.leftafficher();
    paddleRight.rightafficher();
    paddleLeft.leftbouger();
    paddleRight.rightbouger();
}
class PaddleLeft {
    constructor(x, y, paddleLeftWidth, paddleLeftHeight) {
        this.x = x;
        this.y = y;
        this.width = paddleLeftWidth;
        this.height = paddleLeftHeight;
    }
    leftafficher() {
        rect(this.x, this.y, this.width, this.height);
    }
    leftbouger() {
        this.y = mouseX;
        this.y = mouseX;
    }
}

class PaddleRight {
    constructor(x, y, paddleRightWidth, paddleRightHeight) {
        this.x = x;
        this.y = y;
        this.width = paddleRightWidth;
        this.height = paddleRightHeight;
    }
    rightafficher() {
        rect(this.x, this.y, this.width, this.height);
    }
    rightbouger() {
        this.y = mouseY;
        this.y = mouseY;
    }
}

function drawElements() {
    // paddleLeft.y = mouseX;
    // paddleRight.y = mouseY;
    // rect(paddleLeft.x, paddleLeft.y, paddleLeft.width, paddleLeft.height);
    // rect(paddleRight.x, paddleRight.y, paddleRight.width, paddleRight.height);
    ellipse(ball.x, ball.y, ball.radius);
    textSize(100);
    textAlign(RIGHT)
    text(scoreLeft, width / 2 - 40, 100);
    textAlign(LEFT)

    text(scoreRight, width / 2 + 40, 100);

    for (let y = 0; y < height; y = y + 30) {
        rect(width / 2, y, 20, 20);
    }
}

function bounceBall() {
    // Detection de collision Paddle Right
    if (ball.x >= paddleRight.x - paddleRight.width * 2 &&
        ball.y >= paddleRight.y - paddleRight.height / 2 &&
        ball.y <= paddleRight.y + paddleRight.height / 2) {
        ball.speedX = -ball.speedX;
        ball.speedY = random(-5, 5);
    }

    // Detection de collision Paddle Left
    if (ball.x <= paddleLeft.x + paddleLeft.width * 2 &&
        ball.y >= paddleLeft.y - paddleLeft.height / 2 &&
        ball.y <= paddleLeft.y + paddleLeft.height / 2) {
        ball.speedX = -ball.speedX;
        ball.speedY = random(-5, 5);
    }

    // Detection collision "murs" haut et bas
    if (ball.y <= ball.radius || ball.y >= height - ball.radius) {
        ball.speedY = -ball.speedY;
    }

    if (ball.x > width) {
        resetBall('left');
        scoreLeft += 1;
    } else if (ball.x < 0) {
        resetBall('right');
        scoreRight += 1;
    }
}

// function movePaddle() {
//     paddleRight.y = mouseY;
//     paddleLeft.y = mouseX;
// }

function moveBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
}

function resetBall() {
    ball.x = width / 2;
    ball.y = height / 2;
    ball.speedX = -ball.speedX;
    ball.speedY = random(-2, 2);

}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    setup();
}