

function iscollideRectangle(circle, rectangle) {
    // let dX = Math.abs(bubble.pos[0] - (rectangle.pos[0] - rectangle.width / 2));
    // let dY = Math.abs(bubble.pos[1] - (rectangle.pos[1] - rectangle.height / 2));
    // if (dX <= (rectangle.width / 2)) {
    //     bubble.vel[0] = bubble.vel[0] * -1;
    // }
    // if (dY <= (rectangle.height / 2)) {
    //     bubble.vel[1] = bubble.vel[1] * -1;
    // }
    // let cornerX = dX + (rectangle.width / 2);
    // let cornerY = dY + (rectangle.height / 2);
    // if (cornerX * cornerX + cornerY + cornerY <= bubble.radius * bubble.radius) {
    //     bubble.vel[1] = bubble.vel[1] * -1;
    //     bubble.vel[0] = bubble.vel[0] * -1;
    // }

    let distX = Math.abs(circle.pos[0] - (rectangle.pos[0] + rectangle.width / 2))
    let distY = Math.abs(circle.pos[1] - (rectangle.pos[1] + rectangle.height / 2))
    if (distX > (rectangle.width / 2) + circle.radius) {return false;}
    if (distY > (rectangle.height / 2) + circle.radius) {return false;}

    if (distX <= (rectangle.width / 2)) {return 'horizontal';}
    if (distY <= (rectangle.height / 2)) {return 'vertical';}

    let dx = distX + rectangle.width / 2;
    let dy = distY + rectangle.height / 2;
    return (dx * dx + dy * dy <= (circle.radius * circle.radius))

}

    



module.exports = iscollideRectangle