class Obstacle {
    constructor(pos_, dist_) {
        this.pos = pos_;
        this.dist = dist_;
        //this.ep = this.dist / 20 + 20;
        this.ep = 50;
    }
    
    move() {
        let speed = 100 / sqrt(this.dist);
        this.dist -= speed;
        //this.ep = this.dist / 20 + 20;
    }

    show() { 
    let r, angle, x, y;
    noStroke();
    fill(G_hue,G_sat,100);
        
    beginShape();
        
    angle = (this.pos - 1) * 60;   
    x = (this.dist + beat) * cos(angle);
    y = (this.dist + beat) * sin(angle);
    vertex(x, y);
    x = (this.dist + this.ep + beat) * cos(angle);
    y = (this.dist + this.ep + beat) * sin(angle);
    vertex(x, y);
        
    angle = this.pos * 60;
    x = (this.dist + this.ep + beat) * cos(angle);
    y = (this.dist + this.ep + beat) * sin(angle);
    vertex(x, y);
    x = (this.dist + beat) * cos(angle);
    y = (this.dist + beat) * sin(angle);
    vertex(x, y);
        
    endShape(CLOSE);
    }
}