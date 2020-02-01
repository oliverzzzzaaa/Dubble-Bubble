

function iscollideRectangle(bubble, rectangle) {
    let dX = Math.abs(bubble.pos[0] - (rectangle.pos[0] - rectangle.width / 2));
    let dY = Math.abs(bubble.pos[1] - (rectangle.pos[1] - rectangle.height / 2));
    if (dX <= (rectangle.width / 2)) {
        bubble.vel[0] = bubble.vel[0] * -1;
    }
    if (dY <= (rectangle.height / 2)) {
        bubble.vel[1] = bubble.vel[1] * -1;
    }
    let cornerX = dX + (rectangle.width / 2);
    let cornerY = dY + (rectangle.height / 2);
    if (cornerX * cornerX + cornerY + cornerY <= bubble.radius * bubble.radius) {
        bubble.vel[1] = bubble.vel[1] * -1;
        bubble.vel[0] = bubble.vel[0] * -1;
    }

}

    // var distX = Math.abs(circle.x - rect.x-rect.w/2);
    // var distY = Math.abs(circle.y - rect.y-rect.h/2);

    // if (distX > (rect.w/2 + circle.r)) { return false; }
    // if (distY > (rect.h/2 + circle.r)) { return false; }

    // if (distX <= (rect.w/2)) { return true; } 
    // if (distY <= (rect.h/2)) { return true; }



module.exports = iscollideRectangle