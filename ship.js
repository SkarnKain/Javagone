class Ship {
    constructor() {
        this.angle = 270;
        this.rotation = 0;
        this.rot_accel = 0;
        this.size = 7;
        this.trans = 70;
    }

    show() {
        push();
        if (this.rotation <= 10 && this.rotation >= -10) {
            this.rotation += this.rot_accel;
        }
        this.angle += this.rotation;
        
        rotate(this.angle);
        translate(this.trans, 0);
        if (this.angle < 0) {this.angle+=360}
        if (this.angle > 360) {this.angle-=360}
        noStroke();
        fill(G_hue,G_sat,100);
        beginShape();
        for (let i = 0; i < 3; i++) {
            let angle = map(i, 0, 3, 0, 360);
            let x = (this.size + beat) * cos(angle);
            let y = (this.size + beat) * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }
    hit(obst) {
        let angle_obst_min = (obst.pos - 1) * 60;
        let angle_obst_max = obst.pos * 60;
        let pos_ship = this.trans + this.size;
        let pos_obst_min = obst.dist;
        let pos_obst_max = obst.dist + obst.ep;
            
        return(this.angle >= angle_obst_min && this.angle <= angle_obst_max && pos_ship >= pos_obst_min && pos_ship <= pos_obst_max)
    }
    
}