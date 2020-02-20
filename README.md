# Dubble-Bubble

Dubble Trouble is a bubble trouble shooter game with multiple levels and speeds. Players have to shoot large bouncing balls, halving them in size until they disappear. At the same time, they must dodge the balls as they bounce around the user. 

[Dubble-Bubble](https://oliverzzzzaaa.github.io/Dubble-Bubble/dist/)

Technologies Used:

  + Javascript
  + Canvas
  + HTML 5
  
My site is hosted on Github Pages, since there isn't much of a back-end. I wanted to showcase my javascript skills
and strong fundementals by implementing a simple game, with my own game physics.


Some Features:

  + Shooting: Bullets travel upwards at a constant speed, until they hit the top. If the bullet hits a bubble, the bubble 
    pops into two half sized, with similar speeds. Otherwise, the bullet disappears at the top. Each user is allowed one
    bullet at a time.

  + Death: If a bubble hits a player, the player loses their life and the level restarts. Upon losing all their lives,
    the game ends and resets to level one.
    
  + Bouncing: The bubbles bounce normally off the sides, but also have vertical acceleration to mimic real physics. However,
    bubbles will bounce to the same height every time, depending on its size, with the minimum bounce just above the player.

## ***Code Snippets:***


Single Player death: 

```
 this.map.bubbles.forEach(bubble => {
        this.map.players.forEach(player => {
            let dX = Math.abs(bubble.pos[0] - player.pos[0])
            let dY = Math.abs(bubble.pos[1] - player.pos[1])
            if (dX * dX + dY * dY <= (player.radius + bubble.radius) * (player.radius + bubble.radius)) {
                this.players.forEach(player => player.clearBullet())
                this.playerOnelives -=1;
                if (this.playerOnelives > 0) {
                    this.restartLevel(player)
                } else {
                    this.isOver = true
                }
            }
        })
    })
 ```
 
 Bubble Pop:
 
 ```
 Game.prototype.shouldPop = function(bullet) {
    for (let i = 0; i < this.map.bubbles.length; i++) {
        let bubble = this.map.bubbles[i];
        if (bullet.top <= bubble.pos[1] + bubble.radius && (bullet.pos[0] > bubble.pos[0] - 
             bubble.radius && bullet.pos[0] < bubble.pos[0] + bubble.radius)) {
            let newBubbles = [new Bubble({
                pos: bubble.pos.slice(),
                vel: [bubble.vel[0], bubble.vel[1] * 0.5],
                radius: (bubble.radius / 2)
            }), new Bubble({
                pos: bubble.pos.slice(),
                vel: [(bubble.vel[0] * -1), bubble.vel[1] * 0.5],
                radius: (bubble.radius / 2)
            })]
            //two new bubbles in opposite X directions, half radius
            if (bubble.radius > 10) {
                this.map.bubbles = this.map.bubbles.concat(newBubbles)
            }
                this.map.bubbles.splice(i, 1);
            return true
        }
    }
}
 
 ```



Screenshots:
