let rotation = 0;
let rotation_speed = 0;
let target_speed = 0;
let beat;
let obstacles = [];
let obst_counter = 0;
let obst_delay = 0;
let G_hue = 0;
let G_sat = 0;
let target_G_hue = 0;
let target_G_sat = 0;
let start_center_r = 400;

function setup() {
    angleMode(DEGREES);
    colorMode(HSB,100);
    createCanvas(windowWidth, windowHeight);
    ship = new Ship();
}

function draw() {
    if (start_center_r !== 0) {
        start_center_r -= 8;
    }
    beat = frameCount/10 % 3;
    if (frameCount % 600 == 0) {
        if (target_speed > 0) {target_speed = random(-2000,0)/1000;}
        else  {target_speed = random(0,2000)/1000;}
        
        target_G_hue = random(100);
        target_G_sat = 100;
    }
    rotation_speed += (target_speed - rotation_speed) * 0.05;
    G_hue += (target_G_hue - G_hue) * 0.005;
    G_sat += (target_G_sat - G_sat) * 0.005;
    
    
    if (obst_counter == obst_delay) {
        new_obst_pattern();
    }
    obst_counter++;
    
    push();
    translate(width/2, height/2);
    rotation = rotation + rotation_speed;
    rotate(rotation);   
    
    draw_background();
    
    for (let i = obstacles.length-1; i > 0; i--) {
        obstacles[i].move();
        obstacles[i].show();
        if (ship.hit(obstacles[i])) {
            console.log("HITTTTTTTTTT");
        }
        if (obstacles[i].dist <= 0) {
            obstacles.splice(i, 1);
        }
    }
    
    ship.show();
    draw_center()
    pop();
}


function keyReleased() {
  if (keyCode == RIGHT_ARROW) {
        ship.rot_accel = 0;
        ship.rotation *= 0;
    
  } else if (keyCode == LEFT_ARROW) {
        ship.rot_accel = 0;
        ship.rotation = 0;
  }
}


function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        ship.rot_accel = 0.5;
    } else if (keyCode == LEFT_ARROW) {
        ship.rot_accel = -0.5;
    }
}

    
function convert_theta(x1, y1, x2, y2) {
    this.x = x1 - x2;
    this.y = y1 - y2;
    if (this.x > 0 && this.y >= 0){
        this.theta = atan(y / x);
    } else if (this.x > 0 && this.y < 0){
        this.theta = atan(y / x) + TWO_PI;
    } else if (this.x < 0){
        this.theta = atan(y / x) + PI;
    } else if (this.x = 0 && this.y > 0){
        this.theta = PI / 2;
    } else if (this.x = 0 && this.y < 0){
        this.theta = 3 * PI / 2;
    }
return theta;
}

function draw_background() {
    background(G_hue,G_sat,int((beat*3)));
    noStroke();
    fill(G_hue,G_sat,30-int((beat*3)));
    let r = 10000;
    let angle = 0;
    let x = 0;
    let y =
    
    beginShape();
    vertex(0, 0);
    angle = 0;
    x = r * cos(angle);
    y = r * sin(angle);
    vertex(x, y);
    angle = 60;
    x = r * cos(angle);
    y = r * sin(angle);
    vertex(x, y);
    endShape(CLOSE);
    
    
    beginShape();
    vertex(0, 0);
    angle = 120;
    x = r * cos(angle);
    y = r * sin(angle);
    vertex(x, y);
    angle = 180;;
    x = r * cos(angle);
    y = r * sin(angle);
    vertex(x, y);
    endShape(CLOSE);
    
    
    beginShape();
    vertex(0, 0);
    angle = 240;
    x = r * cos(angle);
    y = r * sin(angle);
    vertex(x, y);
    angle = 300;
    x = r * cos(angle);
    y = r * sin(angle);
    vertex(x, y);
    endShape(CLOSE); 
}

function draw_center() {
    strokeWeight(3);
    stroke(G_hue,G_sat,100);
    fill(G_hue,G_sat,30-int((beat*3)));
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = map(i, 0, 6, 0, 360);
      let r = 50 + beat + start_center_r;
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
}

function new_obst_pattern() {
    let rnd = random([1,2,3,4,5]);
    let obst;
    switch(rnd) {
        case 1:
            let trou = random([1,1,1,1,1,1,2,3,4,5,6]);
            for (let i = 1; i<= 6; i++) {
                if (i != trou) {
                    obst = new Obstacle(i, 2000);
                    obstacles.push(obst);
                }
            }
            obst_delay = 60;
            obst_counter = 0;
            break;
        case 2:
            obst = new Obstacle(1, 2000);
            obstacles.push(obst);
            obst = new Obstacle(4, 2000);
            obstacles.push(obst);
            obst = new Obstacle(3, 2050);
            obstacles.push(obst);
            obst = new Obstacle(6, 2050);
            obstacles.push(obst);
            obst = new Obstacle(2, 2100);
            obstacles.push(obst);
            obst = new Obstacle(5, 2100);
            obstacles.push(obst);
            obst_delay = 120;
            obst_counter = 0;
            break;
        case 3:
            obst = new Obstacle(1, 2000);
            obstacles.push(obst);
            obst = new Obstacle(2, 2000);
            obstacles.push(obst);
            obst = new Obstacle(4, 2000);
            obstacles.push(obst);
            obst = new Obstacle(5, 2000);
            obstacles.push(obst);
            obst_delay = 60;
            obst_counter = 0;
            break;
        case 4:
            obst = new Obstacle(2, 2000);
            obstacles.push(obst);
            obst = new Obstacle(3, 2000);
            obstacles.push(obst);
            obst = new Obstacle(5, 2000);
            obstacles.push(obst);
            obst = new Obstacle(6, 2000);
            obstacles.push(obst);
            obst_delay = 60;
            obst_counter = 0;
            break;
        case 5:
            obst = new Obstacle(3, 2000);
            obstacles.push(obst);
            obst = new Obstacle(4, 2000);
            obstacles.push(obst);
            obst = new Obstacle(6, 2000);
            obstacles.push(obst);
            obst = new Obstacle(1, 2000);
            obstacles.push(obst);
            obst_delay = 60;
            obst_counter = 0;
            break;
     }
    
}